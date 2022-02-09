/// const express = require("express")
const winston = require("winston")



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


// --- // --- // --- //
// Middleware to check is the user is authenticated in the requests flow
// WE add this function as middleware to allrouters we want to protect with authentication
// Example : I want the users router to require authentication, but not the puppies router
const isLoggedIn = (request, response, next) => {
  // we consider the user loged in if and only if there is a user in the http request (or http session ?)
  request.user ? next() : response.status(401)
};
// All authentication methods will make use of that same middleware

/*
const httpSessionInspector = (request, response, next) => {
  // we consider the user loged in if and only if there is a user in the http request (or http session ?)
  // we consider the user loged in if and only if there is a user in the http request (or http session ?)
  pokus_logger.info(`// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //`)
  pokus_logger.info(`// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //`)
  pokus_logger.info(`// ****!!!!!!!****!!!!!!!****  httpSessionInspector MIDDLEWARE `)
  pokus_logger.info(`// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //`)
  pokus_logger.info(`// ****!!!!!!!****!!!!!!!****  request.body : `)
  pokus_logger.info(JSON.stringify(request.body, " ", 2))
  pokus_logger.info(`// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //`)
  pokus_logger.info(`// ****!!!!!!!****!!!!!!!****  request.query : `)
  pokus_logger.info(JSON.stringify(request.query, " ", 2))
  //pokus_logger.info(JSON.stringify(request, " ", 2))
  // pokus_logger.info(request)
  // pokus_logger.info(request.body)
  pokus_logger.info(`// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //`)
  pokus_logger.info(`// ****!!!!!!!****!!!!!!!****  response : `)
  // pokus_logger.info(JSON.stringify(response, " ", 2))
  // pokus_logger.info(response)
  pokus_logger.info(`// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //`)
  pokus_logger.info(`// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //`)
  pokus_logger.info(`// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //`)
  pokus_logger.info(`// ****!!!!!!!****!!!!!!!****  httpSessionInspector MIDDLEWARE COMPLETED ITS WORK!!`)
  pokus_logger.info(`// ****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!**** //`)

  // next();

};
*/

module.exports = {
  isLoggedIn: isLoggedIn/*,
  httpSessionInspector: httpSessionInspector
  */
};
