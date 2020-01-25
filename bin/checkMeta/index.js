const checkPackage = require('./package');
const checkLocales = require('./locales');
const logger = require('../../config/utils/logger')('Check meta');

const checkMeta = async() => {
  await checkPackage();
  await checkLocales();
  logger.info('✅ Done.\n');
};

checkMeta();
