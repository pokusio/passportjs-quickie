// // -- // -- // -- // -- // -- // -- // --
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
// // -- // -- // -- // -- // -- // -- // --
const express = require('express');
const winston = require('winston');
const router = express.Router();
const handlers = require('./handlers');

// // -- // -- // -- // -- // -- // -- // --
// const mongoose = require('mongoose');
// // -- // -- // -- // -- // -- // -- // --


// // -- // -- // -- // -- // -- // -- // --
// const users_mongoose_schemas = require("./../../models/user/user.schema")
// const pokus_connections = require("./../../connection/pool/")
// // -- // -- // -- // -- // -- // -- // --


/*   const pokus_logger = pokus_logging.getLogger();  */
const pokus_logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});

/*
try {
  pokus_logger.info(`/****** JBL DEBUG POINT is tracking an error`);
} catch (trackedError) {
  pokus_logger.info(`/****** JBL DEBUG POINT error found :`);
  pokus_logger.error(trackedError);

} finally {
  pokus_logger.info(`/****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!* `);
  pokus_logger.info(`/****** JBL DEBUG POINT`);
  pokus_logger.info(`/****** JBL DEBUG POINT`);
  pokus_logger.info(`/****** JBL DEBUG POINT`);
  pokus_logger.info(`/****** JBL DEBUG POINT`);
  pokus_logger.info(`/****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!* `);
}
*/


// Users Endpoint Routes.
router.get('/api/v1/users', handlers.retrieveHandler)
router.post('/api/v1/users', handlers.createHandler)
router.put('/api/v1/users', handlers.updateHandler)
router.delete('/api/v1/users', handlers.deleteHandler)

module.exports = router;
