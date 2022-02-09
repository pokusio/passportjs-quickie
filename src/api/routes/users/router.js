// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
const express = require('express');
const router = express.Router();
const winston = require('winston');



const handlers = require('./handlers');
/// const pokus_auth_commons = require('./../../../auth')




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

/// router.use(pokus_auth_commons.isLoggedIn) // https://expressjs.com/en/guide/using-middleware.html#middleware.router


// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //
// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //
// ****!!!!!!!****!!!!!!!****!!!!!!!      ROUTES     ****!!!!!!!****!!!!!!!****!!!!!!!**** //
// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //
// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //


router.get('/api/v1/users', (request, response, next) => {
  pokus_logger.info(`/****** JBL DEBUG POINT is tracking {{{{[[GET ROUTER USERS]]}}}}`);
  // response.status(200).redirect('/login')
  handlers.retrieveHandler(request, response, next);
})
router.post('/api/v1/users', (request, response, next) => {
  pokus_logger.info(`/****** JBL DEBUG POINT is tracking {{{{[[POST ROUTER USERS]]}}}}`);
  handlers.createHandler(request, response, next);
})
router.put('/api/v1/users', (request, response, next) => {
  pokus_logger.info(`/****** JBL DEBUG POINT is tracking {{{{[[PUT ROUTER USERS]]}}}}`);
  handlers.updateHandler(request, response, next);
})
router.delete('/api/v1/users', (request, response, next) => {
  pokus_logger.info(`/****** JBL DEBUG POINT is tracking {{{{[[DELETE ROUTER USERS]]}}}}`);
  handlers.deleteHandler(request, response, next);
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
