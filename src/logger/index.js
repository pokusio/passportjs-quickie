const winston = require('winston');
const mongoose = require('mongoose');

const pokus_environment = require("../environment/")

const pokus_logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});


pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`/****** APP LOGGER Initializing Winston logs : `);
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`    [process.env.LOG_LEVEL] : ${process.env.LOG_LEVEL}`);
pokus_logger.error(`Winston Init Tests:  error message`);
pokus_logger.warn(`Winston Init Tests:  warn message`);
pokus_logger.info(`Winston Init Tests:  info message`);
pokus_logger.verbose(`Winston Init Tests:  verbose message`);
pokus_logger.debug(`Winston Init Tests:  debug message`);
pokus_logger.silly(`Winston Init Tests:  silly message`);
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`/************************************************************************* `);

const getLogger = () => {
  return {
    pokus_logger: pokus_logger
  }
}

module.exports = {
    getLogger: getLogger
};
