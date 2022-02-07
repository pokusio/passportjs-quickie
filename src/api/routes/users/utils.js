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
const getUsers = (p_search_str, p_female, p_email, pokus_callback) => {


  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [getUsers = ()] , searching for users with those criterias: `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    User [p_search_str] : '${p_search_str}'`);
  pokus_logger.info(`    User [p_female] : ${p_female}`);
  pokus_logger.info(`    User [p_email] : "${p_email}"`);
  pokus_logger.info(`/** `);

  let p_emailSkip = false;
  let p_femaleSkip = false;


  if (p_female === null ) {
    //
    pokus_logger.info(`    User [p_female] : IS null`);
  } else {
    //
    pokus_logger.info(`    User [p_female] : IS NOT null`);
  }

  if (p_female === undefined || p_female == "undefined" ) {
    //
    pokus_logger.info(`    User [p_female] : IS undefined`);
  } else {
    //
    pokus_logger.info(`    User [p_female] : is NOT undefined`);
  }

  if (p_female === undefined || p_female == "undefined" || p_female === null ) {
    //
    pokus_logger.info(`    User [p_female] : is null or undefined`);
    p_femaleSkip = true;
  } else {
    //
    pokus_logger.info(`    User [p_female] : is NEITHER null NOR undefined`);
  }

  pokus_logger.info(`/** `);


  if (p_email === null ) {
    //
    pokus_logger.info(`    User [p_email] : IS null`);
  } else {
    //
    pokus_logger.info(`    User [p_email] : IS NOT null`);
  }

  if ( (typeof p_email == 'undefined') || p_email == "undefined" ) {
    //
    pokus_logger.info(`    User [p_email] : IS undefined`);
  } else {
    //
    pokus_logger.info(`    User [p_email] : is NOT undefined`);
  }

  if ( (typeof p_email == 'undefined') || p_email == "undefined" || p_email === null ) {
    //
    pokus_logger.info(`    User [p_email] : is null or undefined`);
    p_emailSkip = true;

  } else {
    //
    pokus_logger.info(`    User [p_email] : is NEITHER null NOR undefined`);
  }
  pokus_logger.info(`TypeOf p_email is : [${typeof p_email}]`)

  pokus_logger.info(`/************************************************************************* `);

  // UserModel.find();

  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [getUsers = ()] , before launching MongoDB search: `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    User search [p_femaleSkip] : '${p_femaleSkip}'`);
  pokus_logger.info(`    User search [p_emailSkip] : ${p_emailSkip}`);
  pokus_logger.info(`/** **********************************************`);


  if (p_femaleSkip) {
    if (p_emailSkip) {

      pokus_logger.info(`/** ******** no 'email', no 'is_female' search criterias : `);
      pokus_logger.info(`        XxxxModel.find({ cute_name: { $regex: "^${p_search_str}.*$" }}) `);
      let searchRegExp = "^.*" + p_search_str + ".*$";

      pokus_logger.info(`/** ******** léger chgmt...ou pas : `);
      UserModel.find({ fullname : { $regex: searchRegExp } }).limit(20).then((docs) => {
        pokus_callback(docs);
      });

    } else {


      pokus_logger.info(`/** ******** with 'email', but no 'is_female' search criterias : `);
      pokus_logger.info(`        XxxxModel.find({ fullname: { $regex: "^${p_search_str}.*$" }}) `);
      let searchRegExp = "^" + p_search_str + ".*$";

      pokus_logger.info(`/** ******** no 'email', no 'is_female' search criterias : `);
      pokus_logger.info(`        XxxxModel.find({ email: { $regex: "^${p_email}.*$" }}) `);
      let searchRegExpEmail = "^.*" + p_email + ".*$";
      // executes, passing results to callback
      /// retrievedUsers = UserModel.find({ cute_name: `/${p_search_str}/i`, email: p_co lor}, function (err, docs) {});
      UserModel.find({ fullname : { $regex: searchRegExp }, email: { $regex: searchRegExpEmail }}).limit(20).then((docs) => {
        pokus_callback(docs);
      });

    }
  } else {
    if (p_emailSkip) {

      pokus_logger.info(`/** ******** no 'email', but with 'is_female' search criterias : `);
      pokus_logger.info(`        XxxxModel.find({ fullname: { $regex: "^${p_search_str}.*$" }}) `);
      let searchRegExp = "^" + p_search_str + ".*$";

      // executes, passing results to callback
      /// retrievedUsers = UserModel.find({ cute_name: `/${p_search_str}/i`, email: p_co lor}, function (err, docs) {});
      UserModel.find({ cute_name: { $regex: searchRegExp }, is_female: p_female }).limit(20).then((docs) => {
        pokus_callback(docs);
      });

    } else {
      pokus_logger.info(`/** ******** with both 'email', and 'is_female' search criterias : `);
      pokus_logger.info(`        XxxxModel.find({ fullname: { $regex: "^${p_search_str}.*$" }}) `);
      let searchRegExp = "^" + p_search_str + ".*$";
      pokus_logger.info(`        XxxxModel.find({ email: { $regex: "^${p_email}.*$" }}) `);
      let searchRegExpEmail = "^.*" + p_email + ".*$";

      // executes, passing results to callback
      /// retrievedUsers = UserModel.find({ cute_name: `/${p_search_str}/i`, is_female: p_female, email: p_co lor}, function (err, docs) {});
      UserModel.find({ fullname: { $regex: searchRegExp }, is_female: p_female, email: { $regex: searchRegExpEmail }}).limit(20).then((docs) => {
        pokus_callback(docs);
      });
    }
  }
};



module.exports = {
    getUsers: getUsers
}
