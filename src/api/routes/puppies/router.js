// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
//
const express = require('express');
var router = express.Router();
const handlers = require('./handlers');

const winston = require('winston');
const pokus_auth_commons = require('./../../../auth')




// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //
// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //
// ****!!!!!!!****!!!!!!!****!!!!!!!         LOGGING      ****!!!!!!!****!!!!!!!****!!!!!!!**** //
// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //
// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //


/*   const pokus_logger = pokus_logging.getLogger();  */
const pokus_logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});





// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //
// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //
// ****!!!!!!!****!!!!!!!****!!!!!!!      MIDDLEWARES     ****!!!!!!!****!!!!!!!****!!!!!!!**** //
// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //
// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //


// We inspect the resquest and response objects to check what's in the HTTP session object
// router.use(pokus_auth_commons.httpSessionInspector) // https://expressjs.com/en/guide/using-middleware.html#middleware.router

router.use(pokus_auth_commons.isLoggedIn) // https://expressjs.com/en/guide/using-middleware.html#middleware.router


// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //
// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //
// ****!!!!!!!****!!!!!!!****!!!!!!!      ROUTES     ****!!!!!!!****!!!!!!!****!!!!!!!**** //
// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //
// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //


/// try {
///   pokus_logger.info(`/****** [PUPPIES ROUTER] JBL DEBUG POINT is tracking an error`);
/// } catch (trackedError) {
///   pokus_logger.info(`/****** [PUPPIES ROUTER] JBL DEBUG POINT error found :`);
///   pokus_logger.error(trackedError);
///
/// } finally {
///   pokus_logger.info(`/****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!* `);
///   pokus_logger.info(`/****** [PUPPIES ROUTER] JBL DEBUG POINT`);
///   pokus_logger.info(`/****** [PUPPIES ROUTER] JBL DEBUG POINT`);
///   pokus_logger.info(`/****** [PUPPIES ROUTER] JBL DEBUG POINT`);
///   pokus_logger.info(`/****** [PUPPIES ROUTER] JBL DEBUG POINT`);
///   pokus_logger.info(`/****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!* `);
/// }


router.get('/api/v1/puppies', (request, response, next) => {
  pokus_logger.info(`/****** [PUPPIES ROUTER] JBL DEBUG POINT is tracking {{{{[[GET ROUTER PUPPIES]]}}}}`);
  // response.status(200).redirect('/login')
  handlers.retrieveHandler(request, response, next);
})
router.post('/api/v1/puppies', (request, response, next) => {
  pokus_logger.info(`/****** [PUPPIES ROUTER] JBL DEBUG POINT is tracking {{{{[[POST ROUTER PUPPIES]]}}}}`);
  // response.status(200).redirect('/login')
  handlers.createHandler(request, response, next);
})
router.put('/api/v1/puppies', (request, response, next) => {
  pokus_logger.info(`/****** [PUPPIES ROUTER] JBL DEBUG POINT is tracking {{{{[[PUT ROUTER PUPPIES]]}}}}`);
  // response.status(200).redirect('/login')
  handlers.updateHandler(request, response, next);
})
router.delete('/api/v1/puppies', (request, response, next) => {
  pokus_logger.info(`/****** [PUPPIES ROUTER] JBL DEBUG POINT is tracking {{{{[[DELETE ROUTER PUPPIES]]}}}}`);
  // response.status(200).redirect('/login')
  handlers.deleteHandler(request, response, next);
})

/*

*/

// Home page route.
/*
router.get('/api/v1/puppies', (request, response, next) => {
  res.send('Birds home page')
})
router.post('/api/v1/puppies', (request, response, next) => {
  res.send('Birds home page')
})
router.put('/api/v1/puppies', (request, response, next) => {
  res.send('Birds home page')
})
router.delete('/api/v1/puppies', (request, response, next) => {
  res.send('Birds home page')
})
*/


module.exports = router;
