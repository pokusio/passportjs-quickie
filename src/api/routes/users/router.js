// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
const express = require('express');
const router = express.Router();

const winston = require('winston');

/*   const pokus_logger = pokus_logging.getLogger();  */
const pokus_logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});


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


router.get('/api/v1/users', (request, response, next) => {
  pokus_logger.info(`/****** JBL DEBUG POINT is tracking {{{{[[GET ROUTER USERS]]}}}}`);
  // handlers.retrieveHandler(request, response, next);
})
router.post('/api/v1/users', (request, response, next) => {
  pokus_logger.info(`/****** JBL DEBUG POINT is tracking {{{{[[POST ROUTER USERS]]}}}}`);
  // handlers.createHandler(request, response, next);
})
router.put('/api/v1/users', (request, response, next) => {
  pokus_logger.info(`/****** JBL DEBUG POINT is tracking {{{{[[PUT ROUTER USERS]]}}}}`);
  // handlers.updateHandler(request, response, next);
})
router.delete('/api/v1/users', (request, response, next) => {
  pokus_logger.info(`/****** JBL DEBUG POINT is tracking {{{{[[DELETE ROUTER USERS]]}}}}`);
  // handlers.deleteHandler(request, response, next);
})

/*

*/

// Home page route.
/*
router.get('/api/v1/users', (request, response, next) => {
  res.send('Birds home page')
})
router.post('/api/v1/users', (request, response, next) => {
  res.send('Birds home page')
})
router.put('/api/v1/users', (request, response, next) => {
  res.send('Birds home page')
})
router.delete('/api/v1/users', (request, response, next) => {
  res.send('Birds home page')
})
*/


module.exports = router;
