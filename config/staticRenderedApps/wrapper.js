const registeredApps = require('../staticApps');
const schema = require('./schema');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackSsrPlugin = require('html-webpack-ssr-plugin');
const findIndex = require('lodash/findIndex');
const Ajv = require('ajv');
const path = require('path');

const findPluginIndex = (config, filename) =>
  findIndex(config.plugins, plugin => (
    plugin instanceof HtmlWebpackPlugin &&
      plugin.options.filename === filename
  ));

module.exports = (config) => {
  // Validate registry
  const ajv = new Ajv();
  const valid = ajv.validate(schema, registeredApps);
  if (!valid) throw new Error('Invalid static apps config.');

  const isDev = config.mode === 'development';

  registeredApps.forEach((app, i) => {
    const chunkName = `ssr-app-${i}`;
    const entryPath = path.join(__dirname, '../../src/js/', app.script);
    // Add chunk to the entry array
    config.entry[chunkName] = [
      '@babel/polyfill',
      entryPath,
    ];

    const indexPlugin = findPluginIndex(config, 'index.html');
    const embedPlugin = findPluginIndex(config, 'embed.html');

    if (isDev) {
      config.plugins[indexPlugin].options.chunks.push(chunkName);
      config.plugins[embedPlugin].options.chunks.push(chunkName);
      return;
    }

    // Scripts must be isomporhpic!
    config.output.libraryTarget = 'umd';

    // If staticOnly, we exclude chunk from the page
    if (app.staticOnly) {
      config.plugins[indexPlugin].options.excludeChunks.push(chunkName);
      config.plugins[embedPlugin].options.excludeChunks.push(chunkName);
    }

    const pluginConfig = {
      [chunkName]: {
        ...{ selector: app.selector },
        ...(app.pluginOptions || {}),
      },
    };

    config.plugins.push(
      new HtmlWebpackSsrPlugin({
        'index.html': pluginConfig,
        'embed.html': pluginConfig,
      })
    );
  });

  return config;
};
