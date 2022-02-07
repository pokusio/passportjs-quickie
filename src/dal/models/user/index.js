// getting-started.js
const mongoose = require('mongoose');
const winston = require('winston');

const users_mongoose_schemas = require("./user.schema")
const pokus_connections = require("./../../connection/pool/")


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
/// const createUser = (p_cute_name, p_is_female, p_description, p_color) => {
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




/******************************************************************
 *     CRUD Users : DELETE
 ******************************************************************
 * Deletes a user into the database, from its ObjectID :
 * @parameter p_userId String a valid Mongoose MongoDB ObjectId, which is the _id of the record you want to delete from the Mongo database.
 * @throws MongooseException(s) with Mongoose [save()] method on all models
 ***/
const deleteUserById = (p_response, p_userId) => {
  // will make use of query path parameters and parameters to update the user by id,

  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/******FINDME [DELETE /api/v1/users] Router, [deleteUserById()] ID of the user to delete : `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    User [_id] : '${p_userId}'`);
  pokus_logger.info(`/************************************************************************* `);


  let pokusResponseCode = 599;
  let pokusResponseJSON = {};
  try {

    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/****** TRACKER 2 - [deleteUserById = ()] , inspect [userId] param : `);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`    User [p_userId] : `);
    pokus_logger.info(`${p_userId}`);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/****** [deleteUserById = ()] , updating user of 'userId' equal to : [${p_userId}]`);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/** `);

    UserModel.deleteOne({ _id: p_userId }, function(mongooseErr, result){

        if(mongooseErr){
            // res.send(err)
            pokus_logger.error(`There was an error while deleting user of id [${p_userId}]`);

            pokusResponseCode = 500; /// '200 OK' (and not '201  Created'), nothing is created, only updated
            pokusResponseJSON = {
              message: `Pokus [DELETE /api/v1/users], [deleteUserById()]: An error occured while trying to delete the user of ID [${p_userId}] in the database`,
              user_id: p_userId,
              rootError: mongooseErr
            };
            p_response.status(pokusResponseCode);
            p_response.json(pokusResponseJSON);
        } else {
            // res.send(result)
            pokus_logger.info(`Successfully deleted user of id [${p_userId}]`);
            pokusResponseCode = 200; /// '200 OK' (and not '201  Created'), nothing is created, only updated
            pokusResponseJSON = {
              message: `Pokus [DELETE /api/v1/users], [deleteUserById()]: the user of id [${p_userId}] was successfully deleted from the database.`,
              user_id: p_userId
            };
            p_response.status(pokusResponseCode);
            p_response.json(pokusResponseJSON);
        }

    })

  } catch (error) {
    pokus_logger.info(`Pokus [DELETE /api/v1/users], [deleteUserById()]: An error occured while trying to delete the user of id [${p_userId}], in the pokus database. Error message : [${error}]`);

    pokusResponseCode = 500;
    pokusResponseJSON = {
      message: `Pokus [DELETE /api/v1/users], [deleteUserById()]: An error occured while trying to delete the user of id [${p_userId}], in the pokus database. Error message : [${error}]`,
      error: `database error`,
      user_id: p_userId
    };
    p_response.status(pokusResponseCode);
    p_response.json(pokusResponseJSON);
  } finally {
    //
  }
}




/******************************************************************
 *     CRUD Users : UPDATE
 ******************************************************************
 * Inserts a new user into the database, with :
 * @parameter p_userId String a valid Mongoose MongoDB ObjectId, wwhich is the _idof the record in the Mongo DB collection
 * @parameter p_cute_name String
 * @parameter p_is_female Boolean
 * @parameter p_description String
 * @throws MongooseException(s) with Mongoose [save()] method on all models
 ***/
const updateUserById = (p_response, p_userId, p_fullname, p_email, p_short_intro, p_is_female, p_birth_date) => {
  // will make use of query path parameters and parameters to update the user by id,

  const userFromReq = {
    _id: `${p_userId}`,
    fullname: `${p_fullname}`,
    email: `${p_email}`,
    short_intro: `${p_short_intro}`,
    is_female: `${p_is_female}`,
    birth_date: `${p_birth_date}`
  }

  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/******FINDME [PUT /api/v1/users] Router, [updateUserById()] he user received from the http request is: `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    User [_id] : '${userFromReq._id}'`);
  pokus_logger.info(`    User [fullname] : '${userFromReq.fullname}'`);
  pokus_logger.info(`    User [email] : '${userFromReq.email}'`);
  pokus_logger.info(`    User [short_intro] : '${userFromReq.short_intro}'`);
  pokus_logger.info(`    User [is_female] : '${userFromReq.is_female}'`);
  pokus_logger.info(`    User [birth_date] : '${userFromReq.birth_date}'`);
  /// pokus_logger.info(request.body);
  pokus_logger.info(JSON.stringify(userFromReq, " ", 2));
  pokus_logger.info(`/************************************************************************* `);


  pokus_logger.info(` Pokus [PUT /api/v1/users], [updateUserById()]: the user to update in the database is : ${JSON.stringify(userFromReq, " ", 2)} `);

  let pokusResponseCode = 599;
  let pokusResponseJSON = {};
  try {

    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/****** TRACKER 2 - [updateUserById = ()] , inspect [userId] param : `);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`    User [p_userId] : `);
    pokus_logger.info(`${userFromReq._id}`);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/****** [updateUserById = ()] , updating user of 'userId' equal to : [${userFromReq._id}]`);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/** `);

    UserModel.find({ _id: userFromReq._id }).then((results) => {
      // -- // -
      // pokus_callback(results);
      // -- // -
      // if we do find the user, then we update, otherwise we throw an Exception

      pokus_logger.info(`/************************************************************************* `);
      pokus_logger.info(`/****** [updateUserById = ()] , updating user of 'userId' equal to : [${userFromReq._id}]`);
      pokus_logger.info(`/************************************************************************* `);
      pokus_logger.info(`/** Ok so here are the results i get from UserModel.find : `);
      pokus_logger.info(`${JSON.stringify(results, " ", 2)}`);
      pokus_logger.info(`results.length=[${results.length}]`);
      pokus_logger.info(`/** Ok so  : `);
      /// if (results == {}) { // so the user was not found
      /// if (results == []) { // so the user was not found
      if (results.length == 0) { // so the user was not found
        //
          pokus_logger.error(`##### ==>>>> TRACKER JB R+1`);
          pokus_logger.error(`The user of ID [${userFromReq._id}] was not found in the database, so it cannot be updated`);
          pokusResponseCode = 404; /// '200 OK' (and not '201  Created'), nothing is created, only updated
          pokusResponseJSON = {
            message: `Pokus [PUT /api/v1/users], [updateUserById()]: the user of id [${userFromReq._id}] does not exists in the database, so it cannot be updated to : ${JSON.stringify(userFromReq, " ", 2)}`,
            user: userFromReq
          };
          p_response.status(pokusResponseCode);
          p_response.json(pokusResponseJSON);

          // throw new Error(`The user of ID [${userFromReq._id}] was not found `);
      } else {
          //
          // throw new Error(`JBL DEBUG POINT`)
          pokus_logger.error(`##### ==>>>> TRACKER JB R+2`);
          pokus_logger.info(`The user of ID [${userFromReq._id}] was found, so we can update if `);
          UserModel.findByIdAndUpdate(p_userId, userFromReq, function(mongooseErr, result){

              if(mongooseErr){
                  // res.send(err)
                  pokus_logger.error(`There was an error while updating user of id [${userFromReq._id}], to  [${JSON.stringify(userFromReq, " ", 2)}]`);

                  pokusResponseCode = 500; /// '200 OK' (and not '201  Created'), nothing is created, only updated
                  pokusResponseJSON = {
                    message: `Pokus [PUT /api/v1/users], [updateUserById()]: the user below described user was successfully updated in the database : ${JSON.stringify(userFromReq, " ", 2)}`,
                    user: userFromReq,
                    rootError: mongooseErr
                  };
                  p_response.status(pokusResponseCode);
                  p_response.json(pokusResponseJSON);
                  // throw new Error(`There was an error while updating user of id [${userFromReq._id}], to  [${JSON.stringify(userFromReq, " ", 2)}]`);
              }
              else{
                  // res.send(result)
                  pokus_logger.info(`Successfully updated user of id [${userFromReq._id}], to  [${JSON.stringify(userFromReq, " ", 2)}]`);
                  pokusResponseCode = 200; /// '200 OK' (and not '201  Created'), nothing is created, only updated
                  pokusResponseJSON = {
                    message: `Pokus [PUT /api/v1/users], [updateUserById()]: the user below described user was successfully updated in the database : ${JSON.stringify(userFromReq, " ", 2)}`,
                    user: userFromReq
                  };
                  p_response.status(pokusResponseCode);
                  p_response.json(pokusResponseJSON);
              }

          })
      }

    });


  } catch (error) {
    pokus_logger.info(`Pokus [PUT /api/v1/users], [updateUserById()]: An error occured while trying to update the user below attached, in the pokus database. Error message : [${error}]`);

    pokusResponseCode = 500;
    pokusResponseJSON = {
      message: `Pokus [PUT /api/v1/users], [updateUserById()]: An error occured while trying to uodate the user below described, in the pokus database : ${JSON.stringify(userFromReq, " ", 2)} `,
      error: `database error`,
      user: userFromReq
    };
    p_response.status(pokusResponseCode);
    p_response.json(pokusResponseJSON);
  } finally {
    //
  }
}


module.exports = {
    getUsers: getUsers,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    createUser: createUser,
    updateUserById: updateUserById,
    deleteUserById: deleteUserById
}
