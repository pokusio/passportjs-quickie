// getting-started.js
const mongoose = require('mongoose');
const winston = require('winston');

const users_mongoose_schemas = require("./user.schema")
const pokus_connections = require("./../connection/pool/")


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

// ---
// initialize the autoIncrement on User Model, before getting the model (always)
//
// ---> If I use auto increment Plugin, Object Id is not of the right format anymore
//
// users_mongoose_schemas.initializeMongooseAutoIncrement(defaultConnection);
//
// Get the UserModel
const UserModel = users_mongoose_schemas.getModel().model

const handlecreateUserErrors = (err) => {
  pokus_logger.error(`-----------------------------------------------------------------------------`);
  pokus_logger.error(`An error occured during the execution of  [createUser = () => {] : `);
  pokus_logger.error(err);
  pokus_logger.error(`-----------------------------------------------------------------------------`);
  throw err;
}

const handletestDbReadsErrors = (err) => {
  pokus_logger.error(`-----------------------------------------------------------------------------`);
  pokus_logger.error(`An error occured during the execution of  [testDbReads = () => {] : `);
  pokus_logger.error(err);
  pokus_logger.error(`-----------------------------------------------------------------------------`);
  throw err;
}




// const retrievedUsers = pokus_dal.getUsers(searchCriterias.search_str, searchCriterias.female, searchCriterias.email);

/******************************************************************
 *     CRUD Users : RETRIEVE (list, search, browse)
 ******************************************************************
 * Searches among users into the database, with :
 * @parameter p_search_str String query string as first letters of the user's 'fullname' (see mongoose Schema), or string occuring inside 'short_intro'
 * @parameter p_female Boolean search only among females?
 * @parameter p_email String the email of the user you're looking for. provided string shpuld have an exact match
 ***/
/// const getUsers = async (p_search_str, p_female, p_co lor) => {
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
}

/******************************************************************
 *     CRUD Users : RETRIEVE (list, search, browse)
 ******************************************************************
 * Retrieves all users into the database
 ***/
/// const getAllUsers = async (p_search_str, p_female, p_c olor) => {
const getAllUsers = (pokus_callback) => {
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [getAllUsers = ()] , searching for all users: `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/** `);

  UserModel.find().sort({ fullname: -1 })
      .limit(20).then((docs) => {
      pokus_callback(docs);
  });
}



/******************************************************************
 *     CRUD Users : RETRIEVE by Id
 ******************************************************************
 * Retrieves the user with the specified 'userId' _id
 ***/
/// const getAllUsers = async (p_search_str, p_female, p_co lor) => {
const getUserById = (userId, pokus_callback) => {
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** TRACKER 2 - [getUserById = ()] , inspect [userId] param : `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    User [userId] : `);
  pokus_logger.info(`${userId}`);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [getUserById = ()] , searching for user of 'userId' equal to : [${userId}]`);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/** `);

  UserModel.find({ _id: userId }).then((docs) => {
      pokus_callback(docs);
  });
////  UserModel.findById(`${userId}`).then((docs) => {
////      pokus_callback(docs);
////  });

}

/******************************************************************
 *     CRUD Users : CREATE
 ******************************************************************
 * Inserts a new user into the database, with :
 * @parameter p_fullname String
 * @parameter p_email String
 * @parameter p_short_intro String
 * @parameter p_is_female Boolean
 * @parameter p_birth_date String (parsable as mongo/mongoose Date)
 * @throws MongooseException(s) with Mongoose [save()] method on all models
 ***/
/// const createUser = (p_cute_name, p_is_female, p_description, p_co lor) => {
const createUser = (p_fullname, p_email, p_short_intro, p_is_female, p_birth_date) => {


  /// --- /// --- /// --- /// --- /// --- /// --- /// --- ///
  // Create an instance of model UserModel
  let lapk = mongoose.Types.ObjectId();
  var new_user_to_create = new UserModel({
    // userId: `${mongoose.Types.ObjectId()}`,
    _id: `${lapk}`,
    fullname: `${p_fullname}`,
    email: p_email,
    short_intro: `${p_short_intro}`,
    is_female: `${p_is_female}`,
    birth_date: `${p_birth_date}`
  }, { collection: 'users', database: 'pokus' });

  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [createUser = ()] , test inserting a new user: `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    User [fullname] : '${fullname}'`);
  pokus_logger.info(`    User [email] : ${email}`);
  pokus_logger.info(`    User [short_intro] : "${short_intro}"`);
  pokus_logger.info(`    User [is_female] : "${is_female}"`);
  pokus_logger.info(`    User [birth_date] : "${birth_date}"`);
  pokus_logger.info(`/************************************************************************* `);

  /// --- /// --- /// --- /// --- /// --- /// --- /// --- ///
  // Save the new model instance, passing a callback
  new_user_to_create.save(function (err) {
    /// if (err) return handleError(err);
    if (err) {
      pokus_logger.error(`/************************************************************************* `);
      pokus_logger.error(`/****** [createUser = ()] Saving User FAILED!!!`);
      pokus_logger.error(`/************************************************************************* `);
      handlecreateUserErrors(err);
    } else {
      pokus_logger.info(`/************************************************************************* `);
      pokus_logger.info(`/****** [createUser = ()] User  saved! test SUCCESSFUL!!`);
      pokus_logger.info(`/************************************************************************* `);
    }
    // saved!
  });

  return {
    created_user: new_user_to_create
  }
}


module.exports = {
    getUsers: getUsers,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    createUser: createUser
}
