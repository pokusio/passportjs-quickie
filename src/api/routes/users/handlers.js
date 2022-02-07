// getting-started.js
const mongoose = require('mongoose');
const winston = require('winston');

const users_mongoose_schemas = require("./../../../dal/models/user/user.schema")
const pokus_connections = require("./../../../dal/connection/pool/")

const pokus_environment = require("./../../../environment/")
const pokus_dal = require("./../../../dal/")


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


// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // DELETE HANDLER // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
const deleteHandler = (request, response, next) => {

    // 1./ display 'retrieved query params' BEFORE any string operation
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/****** FINDME [DELETE /api/v1/users] Router,    : [${request.query.user_id}] `);
    pokus_logger.info(`/************************************************************************* `);

    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/******FINDME [DELETE /api/v1/users] Router, The user received from the http request is: `);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`    User [request.query.user_id] : '${request.query.user_id}'`);
    pokus_logger.info(`/************************************************************************* `);



    pokus_logger.info(` Pokus [DELETE /api/v1/users]: the user to delete in the database `);
    pokus_dal.deleteUserById(response, request.query.user_id);

};




// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // CREATE HANDLER // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
const createHandler = (request, response, next) => {

    ///

};


// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // UPDATE HANDLER // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
const updateHandler = (request, response, next) => {

    ///

};


// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // RETRIEVE HANDLER // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
const retrieveHandler = (request, response, next) => {

    ///

};



module.exports = {
    updateHandler: updateHandler,
    retrieveHandler: retrieveHandler,
    deleteHandler: deleteHandler,
    createHandler: createHandler
}
