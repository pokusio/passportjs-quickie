// getting-started.js
const mongoose = require('mongoose');
const winston = require('winston');
const fs = require('fs');

const pokus_environment = require("../environment/")
const pokus_secrets = require("../pokus_secrets/")
const puppies_mongoose_schemas = require("./models/puppies/puppy.schema")

const mongoUsername = pokus_secrets.getDatabaseSecrets().username;
const mongoUserPassword = pokus_secrets.getDatabaseSecrets().password;
const mongoDbName = pokus_secrets.getDatabaseSecrets().dbname;

const pokus_connections = require("./../dal/connection/pool/")

/*   const pokus_logger = pokus_logging.getLogger();  */
const pokus_logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});

// // ---
// Get the PuppyModel
const PuppyModel = puppies_mongoose_schemas.getModel().model

const handleCreatePuppyErrors = (err) => {
  pokus_logger.error(`-----------------------------------------------------------------------------`);
  pokus_logger.error(`An error occured during the execution of  [createPuppy = () => {] : `);
  pokus_logger.error(err);
  pokus_logger.error(`-----------------------------------------------------------------------------`);
}
const handleUpdatePuppyErrors = (err) => {
  pokus_logger.error(`-----------------------------------------------------------------------------`);
  pokus_logger.error(`An error occured during the execution of  [createPuppy = () => {] : `);
  pokus_logger.error(err);
  pokus_logger.error(`-----------------------------------------------------------------------------`);
}

const handletestDbReadsErrors = (err) => {
  pokus_logger.error(`-----------------------------------------------------------------------------`);
  pokus_logger.error(`An error occured during the execution of  [testDbReads = () => {] : `);
  pokus_logger.error(err);
  pokus_logger.error(`-----------------------------------------------------------------------------`);
}

// const retrievedPuppies = pokus_dal.getPuppies(searchCriterias.search_str, searchCriterias.female, searchCriterias.color);

/******************************************************************
 *     CRUD Puppies : RETRIEVE (list, search, browse)
 ******************************************************************
 * Searches among puppies into the database, with :
 * @parameter p_search_str String query string as first letters of the name, or string occuring inside description
 * @parameter p_female Boolean search only among females?
 * @parameter p_color String the color of the puppies
 ***/
/// const getPuppies = async (p_search_str, p_female, p_color) => {
const getPuppies = (p_search_str, p_female, p_color, pokus_callback) => {

  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [getPuppies = ()] , searching for puppies with those criterias: `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    Puppy [p_search_str] : '${p_search_str}'`);
  pokus_logger.info(`    Puppy [p_female] : ${p_female}`);
  pokus_logger.info(`    Puppy [p_color] : "${p_color}"`);
  pokus_logger.info(`/** `);

  let p_colorSkip = false;
  let p_femaleSkip = false;


  if (p_female === null ) {
    //
    pokus_logger.info(`    Puppy [p_female] : IS null`);
  } else {
    //
    pokus_logger.info(`    Puppy [p_female] : IS NOT null`);
  }

  if (p_female === undefined || p_female == "undefined" ) {
    //
    pokus_logger.info(`    Puppy [p_female] : IS undefined`);
  } else {
    //
    pokus_logger.info(`    Puppy [p_female] : is NOT undefined`);
  }

  if (p_female === undefined || p_female == "undefined" || p_female === null ) {
    //
    pokus_logger.info(`    Puppy [p_female] : is null or undefined`);
    p_femaleSkip = true;
  } else {
    //
    pokus_logger.info(`    Puppy [p_female] : is NEITHER null NOR undefined`);
  }

  pokus_logger.info(`/** `);


  if (p_color === null ) {
    //
    pokus_logger.info(`    Puppy [p_color] : IS null`);
  } else {
    //
    pokus_logger.info(`    Puppy [p_color] : IS NOT null`);
  }

  if ( (typeof p_color == 'undefined') || p_color == "undefined" ) {
    //
    pokus_logger.info(`    Puppy [p_color] : IS undefined`);
  } else {
    //
    pokus_logger.info(`    Puppy [p_color] : is NOT undefined`);
  }

  if ( (typeof p_color == 'undefined') || p_color == "undefined" || p_color === null ) {
    //
    pokus_logger.info(`    Puppy [p_color] : is null or undefined`);
    p_colorSkip = true;

  } else {
    //
    pokus_logger.info(`    Puppy [p_color] : is NEITHER null NOR undefined`);
  }
  pokus_logger.info(`TypeOf p_color is : [${typeof p_color}]`)

  pokus_logger.info(`/************************************************************************* `);

  // PuppyModel.find();

  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [getPuppies = ()] , before launching MongoDB search: `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    Puppy search [p_femaleSkip] : '${p_femaleSkip}'`);
  pokus_logger.info(`    Puppy search [p_colorSkip] : ${p_colorSkip}`);
  pokus_logger.info(`/** **********************************************`);


  if (p_femaleSkip) {
    if (p_colorSkip) {
      // executes, passing results to callback
      /// retrievedPuppies = PuppyModel.find({ cute_name: `/${p_search_str}/i`}, function (err, docs) {});
      /*
      PuppyModel.find({ cute_name: `/${p_search_str}/i`}, function (err, docs) {
        pokus_callback(err, docs);
      });
      */
      pokus_logger.info(`/** ******** no 'color', no 'is_female' search criterias : `);
      pokus_logger.info(`        XxxxModel.find({ cute_name: { $regex: "^${p_search_str}.*$" }}) `);
      let searchRegExp = "^" + p_search_str + ".*$";

      pokus_logger.info(`/** ******** léger chgmt...ou ppas : `);
      PuppyModel.find({ cute_name: { $regex: searchRegExp } }).limit(20).then((docs) => {
        pokus_callback(docs);
      });

    } else {


      pokus_logger.info(`/** ******** with 'color', but no 'is_female' search criterias : `);
      pokus_logger.info(`        XxxxModel.find({ cute_name: { $regex: "^${p_search_str}.*$" }}) `);
      let searchRegExp = "^" + p_search_str + ".*$";

      // executes, passing results to callback
      /// retrievedPuppies = PuppyModel.find({ cute_name: `/${p_search_str}/i`, color: p_color}, function (err, docs) {});
      PuppyModel.find({ cute_name: { $regex: searchRegExp }, color: `${p_color}`}).limit(20).then((docs) => {
        pokus_callback(docs);
      });

    }
  } else {
    if (p_colorSkip) {

      pokus_logger.info(`/** ******** no 'color', but with 'is_female' search criterias : `);
      pokus_logger.info(`        XxxxModel.find({ cute_name: { $regex: "^${p_search_str}.*$" }}) `);
      let searchRegExp = "^" + p_search_str + ".*$";

      // executes, passing results to callback
      /// retrievedPuppies = PuppyModel.find({ cute_name: `/${p_search_str}/i`, color: p_color}, function (err, docs) {});
      PuppyModel.find({ cute_name: { $regex: searchRegExp }, is_female: p_female }).limit(20).then((docs) => {
        pokus_callback(docs);
      });

    } else {
      pokus_logger.info(`/** ******** with both 'color', and 'is_female' search criterias : `);
      pokus_logger.info(`        XxxxModel.find({ cute_name: { $regex: "^${p_search_str}.*$" }}) `);
      let searchRegExp = "^" + p_search_str + ".*$";
      // executes, passing results to callback
      /// retrievedPuppies = PuppyModel.find({ cute_name: `/${p_search_str}/i`, is_female: p_female, color: p_color}, function (err, docs) {});
      PuppyModel.find({ cute_name: { $regex: searchRegExp }, is_female: p_female, color: p_color}).limit(20).then((docs) => {
        pokus_callback(docs);
      });
    }
  }
  // executes, passing results to callback

  // executes, name LIKE john and only selecting the "name" and "friends" fields
  // await MyModel.find({ name: /john/i }, 'name friends').exec();



  // return retrievedPuppies;
}

/******************************************************************
 *     CRUD Puppies : RETRIEVE (list, search, browse)
 ******************************************************************
 * Retrieves all puppies into the database
 ***/
/// const getAllPuppies = async (p_search_str, p_female, p_color) => {
const getAllPuppies = (pokus_callback) => {
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [getAllPuppies = ()] , searching for all puppies: `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/** `);

  PuppyModel.find().sort({ cute_name: -1 })
      .limit(20).then((docs) => {
      pokus_callback(docs);
  });
}



/******************************************************************
 *     CRUD Puppies : RETRIEVE by Id
 ******************************************************************
 * Retrieves the puppy with the specified 'puppyId' _id
 ***/
/// const getAllPuppies = async (p_search_str, p_female, p_color) => {
const getPuppyById = (puppyId, pokus_callback) => {
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** TRACKER 2 - [getPuppyById = ()] , inspect [puppyId] param : `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    Puppy [puppyId] : `);
  pokus_logger.info(`${puppyId}`);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [getPuppyById = ()] , searching for puppy of 'puppyId' equal to : [${puppyId}]`);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/** `);

  PuppyModel.find({ _id: puppyId }).then((docs) => {
      pokus_callback(docs);
  });
////  PuppyModel.findById(`${puppyId}`).then((docs) => {
////      pokus_callback(docs);
////  });

}



/******************************************************************
 *     CRUD Puppies : DELETE
 ******************************************************************
 * Deletes a puppy into the database, from its ObjectID :
 * @parameter p_puppyId String a valid Mongoose MongoDB ObjectId, which is the _id of the record you want to delete from the Mongo database.
 * @throws MongooseException(s) with Mongoose [save()] method on all models
 ***/
const deletePuppyById = (p_response, p_puppyId) => {
  // will make use of query path parameters and parameters to update the puppy by id,

  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/******FINDME [DELETE /api/v1/puppies] Router, [deletePuppyById()] ID of the puppy to delete : `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    Puppy [_id] : '${p_puppyId}'`);
  pokus_logger.info(`/************************************************************************* `);


  let pokusResponseCode = 599;
  let pokusResponseJSON = {};
  try {

    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/****** TRACKER 2 - [deletePuppyById = ()] , inspect [puppyId] param : `);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`    Puppy [p_puppyId] : `);
    pokus_logger.info(`${p_puppyId}`);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/****** [deletePuppyById = ()] , updating puppy of 'puppyId' equal to : [${p_puppyId}]`);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/** `);

    PuppyModel.deleteOne({ _id: p_puppyId }, function(mongooseErr, result){

        if(mongooseErr){
            // res.send(err)
            pokus_logger.error(`There was an error while deleting puppy of id [${p_puppyId}]`);

            pokusResponseCode = 500; /// '200 OK' (and not '201  Created'), nothing is created, only updated
            pokusResponseJSON = {
              message: `Pokus [DELETE /api/v1/puppies], [deletePuppyById()]: An error occured while trying to delete the puppy of ID [${p_puppyId}] in the database`,
              puppy_id: p_puppyId,
              rootError: mongooseErr
            };
            p_response.status(pokusResponseCode);
            p_response.json(pokusResponseJSON);
        } else {
            // res.send(result)
            pokus_logger.info(`Successfully deleted puppy of id [${p_puppyId}]`);
            pokusResponseCode = 200; /// '200 OK' (and not '201  Created'), nothing is created, only updated
            pokusResponseJSON = {
              message: `Pokus [DELETE /api/v1/puppies], [deletePuppyById()]: the puppy of id [${p_puppyId}] was successfully deleted from the database.`,
              puppy_id: p_puppyId
            };
            p_response.status(pokusResponseCode);
            p_response.json(pokusResponseJSON);
        }

    })

  } catch (error) {
    pokus_logger.info(`Pokus [DELETE /api/v1/puppies], [deletePuppyById()]: An error occured while trying to delete the puppy of id [${p_puppyId}], in the pokus database. Error message : [${error}]`);

    pokusResponseCode = 500;
    pokusResponseJSON = {
      message: `Pokus [DELETE /api/v1/puppies], [deletePuppyById()]: An error occured while trying to delete the puppy of id [${p_puppyId}], in the pokus database. Error message : [${error}]`,
      error: `database error`,
      puppy_id: p_puppyId
    };
    p_response.status(pokusResponseCode);
    p_response.json(pokusResponseJSON);
  } finally {
    //
  }
}






/******************************************************************
 *     CRUD Puppies : UPDATE
 ******************************************************************
 * Inserts a new puppy into the database, with :
 * @parameter p_puppyId String a valid Mongoose MongoDB ObjectId, wwhich is the _idof the record in the Mongo DB collection
 * @parameter p_cute_name String
 * @parameter p_is_female Boolean
 * @parameter p_description String
 * @throws MongooseException(s) with Mongoose [save()] method on all models
 ***/
const updatePuppyById = (p_response, p_puppyId, p_cute_name, p_is_female, p_description, p_color) => {
  // will make use of query path parameters and parameters to update the puppy by id,

  const puppyFromReq = {
    _id: `${p_puppyId}`,
    cute_name: `${p_cute_name}`,
    is_female: `${p_is_female}`,
    description: `${p_description}`,
    color: `${p_color}`
  }

  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/******FINDME [PUT /api/v1/puppies] Router, [updatePuppyById()] he puppy received from the http request is: `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    Puppy [_id] : '${puppyFromReq._id}'`);
  pokus_logger.info(`    Puppy [cute_name] : '${puppyFromReq.cute_name}'`);
  pokus_logger.info(`    Puppy [is_female] : '${puppyFromReq.is_female}'`);
  pokus_logger.info(`    Puppy [description] : '${puppyFromReq.description}'`);
  pokus_logger.info(`    Puppy [color] : '${puppyFromReq.color}'`);
  /// pokus_logger.info(request.body);
  pokus_logger.info(JSON.stringify(puppyFromReq, " ", 2));
  pokus_logger.info(`/************************************************************************* `);


  pokus_logger.info(` Pokus [PUT /api/v1/puppies], [updatePuppyById()]: the puppy to update in the database is : ${JSON.stringify(puppyFromReq, " ", 2)} `);

  let pokusResponseCode = 599;
  let pokusResponseJSON = {};
  try {

    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/****** TRACKER 2 - [updatePuppyById = ()] , inspect [puppyId] param : `);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`    Puppy [p_puppyId] : `);
    pokus_logger.info(`${puppyFromReq._id}`);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/****** [updatePuppyById = ()] , updating puppy of 'puppyId' equal to : [${puppyFromReq._id}]`);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/** `);

    PuppyModel.find({ _id: puppyFromReq._id }).then((results) => {
      // -- // -
      // pokus_callback(results);
      // -- // -
      // if we do find the puppy, then we update, otherwise we throw an Exception

      pokus_logger.info(`/************************************************************************* `);
      pokus_logger.info(`/****** [updatePuppyById = ()] , updating puppy of 'puppyId' equal to : [${puppyFromReq._id}]`);
      pokus_logger.info(`/************************************************************************* `);
      pokus_logger.info(`/** Ok so here are the results i get from PuppyModel.find : `);
      pokus_logger.info(`${JSON.stringify(results, " ", 2)}`);
      pokus_logger.info(`results.length=[${results.length}]`);
      pokus_logger.info(`/** Ok so  : `);
      /// if (results == {}) { // so the puppy was not found
      /// if (results == []) { // so the puppy was not found
      if (results.length == 0) { // so the puppy was not found
        //
          pokus_logger.error(`##### ==>>>> TRACKER JB R+1`);
          pokus_logger.error(`The puppy of ID [${puppyFromReq._id}] was not found in the database, so it cannot be updated`);
          pokusResponseCode = 404; /// '200 OK' (and not '201  Created'), nothing is created, only updated
          pokusResponseJSON = {
            message: `Pokus [PUT /api/v1/puppies], [updatePuppyById()]: the puppy of id [${puppyFromReq._id}] does not exists in the database, so it cannot be updated to : ${JSON.stringify(puppyFromReq, " ", 2)}`,
            puppy: puppyFromReq
          };
          p_response.status(pokusResponseCode);
          p_response.json(pokusResponseJSON);

          // throw new Error(`The puppy of ID [${puppyFromReq._id}] was not found `);
      } else {
          //
          // throw new Error(`JBL DEBUG POINT`)
          pokus_logger.error(`##### ==>>>> TRACKER JB R+2`);
          pokus_logger.info(`The puppy of ID [${puppyFromReq._id}] was found, so we can update if `);
          PuppyModel.findByIdAndUpdate(p_puppyId, puppyFromReq, function(mongooseErr, result){

              if(mongooseErr){
                  // res.send(err)
                  pokus_logger.error(`There was an error while updating puppy of id [${puppyFromReq._id}], to  [${JSON.stringify(puppyFromReq, " ", 2)}]`);

                  pokusResponseCode = 500; /// '200 OK' (and not '201  Created'), nothing is created, only updated
                  pokusResponseJSON = {
                    message: `Pokus [PUT /api/v1/puppies], [updatePuppyById()]: the puppy below described puppy was successfully updated in the database : ${JSON.stringify(puppyFromReq, " ", 2)}`,
                    puppy: puppyFromReq,
                    rootError: mongooseErr
                  };
                  p_response.status(pokusResponseCode);
                  p_response.json(pokusResponseJSON);
                  // throw new Error(`There was an error while updating puppy of id [${puppyFromReq._id}], to  [${JSON.stringify(puppyFromReq, " ", 2)}]`);
              }
              else{
                  // res.send(result)
                  pokus_logger.info(`Successfully updated puppy of id [${puppyFromReq._id}], to  [${JSON.stringify(puppyFromReq, " ", 2)}]`);
                  pokusResponseCode = 200; /// '200 OK' (and not '201  Created'), nothing is created, only updated
                  pokusResponseJSON = {
                    message: `Pokus [PUT /api/v1/puppies], [updatePuppyById()]: the puppy below described puppy was successfully updated in the database : ${JSON.stringify(puppyFromReq, " ", 2)}`,
                    puppy: puppyFromReq
                  };
                  p_response.status(pokusResponseCode);
                  p_response.json(pokusResponseJSON);
              }

          })
      }

    });


  } catch (error) {
    pokus_logger.info(`Pokus [PUT /api/v1/puppies], [updatePuppyById()]: An error occured while trying to update the puppy below attached, in the pokus database. Error message : [${error}]`);

    pokusResponseCode = 500;
    pokusResponseJSON = {
      message: `Pokus [PUT /api/v1/puppies], [updatePuppyById()]: An error occured while trying to uodate the puppy below described, in the pokus database : ${JSON.stringify(puppyFromReq, " ", 2)} `,
      error: `database error`,
      puppy: puppyFromReq
    };
    p_response.status(pokusResponseCode);
    p_response.json(pokusResponseJSON);
  } finally {
    //
  }
}

/******************************************************************
 *     CRUD Puppies : CREATE
 ******************************************************************
 * Inserts a new puppy into the database, with :
 * @parameter p_cute_name String
 * @parameter p_is_female Boolean
 * @parameter p_description String
 * @throws MongooseException(s) with Mongoose [save()] method on all models
 ***/
const createPuppy = (p_cute_name, p_is_female, p_description, p_color) => {
  /// var PuppySchema = new Schema({
    /// cute_name: String,
    /// description: String,
    /// is_female: Boolean,
    /// birth_date: Date
  /// });

  /// --- /// --- /// --- /// --- /// --- /// --- /// --- ///
  // Create an instance of model PuppyModel
  let lapk = mongoose.Types.ObjectId();
  var cutest_puppy = new PuppyModel({
    // puppyId: `${mongoose.Types.ObjectId()}`,
    _id: `${lapk}`,
    cute_name: `${p_cute_name}`,
    is_female: p_is_female,
    description: `${p_description}`,
    color: `${p_color}`
  }, { collection: 'puppies', database: 'pokus' });

  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [createPuppy = ()] , test inserting a new puppy: `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    Puppy [cute_name] : '${p_cute_name}'`);
  pokus_logger.info(`    Puppy [is_female] : ${p_is_female}`);
  pokus_logger.info(`    Puppy [description] : "${p_description}"`);
  pokus_logger.info(`    Puppy [color] : "${p_color}"`);
  pokus_logger.info(`/************************************************************************* `);

  /// --- /// --- /// --- /// --- /// --- /// --- /// --- ///
  // Save the new model instance, passing a callback
  cutest_puppy.save(function (err) {
    /// if (err) return handleError(err);
    if (err) {
      pokus_logger.error(`/************************************************************************* `);
      pokus_logger.error(`/****** [createPuppy = ()] Saving Puppy FAILED!!!`);
      pokus_logger.error(`/************************************************************************* `);
      return handleCreatePuppyErrors(err);
    } else {
      pokus_logger.info(`/************************************************************************* `);
      pokus_logger.info(`/****** [createPuppy = ()] Puppy  saved! test SUCCESSFUL!!`);
      pokus_logger.info(`/************************************************************************* `);
    }
    // saved!
  });

  return {
    created_puppy: cutest_puppy,
  }
}

/**
 * Test: retrieving all the cutest puppies from database
 ***/

///   const testDbReads = () => {
///
///     // find all athletes who play tennis, selecting the 'name' and 'age' fields
///     /*
///     PuppyModel.find({ 'is_female': 'true' }, 'cute_name description', function (err, puppies) {
///       if (err) return handleError(err);
///       // 'puppies' contains the list of athletes that match the criteria.
///
///     })
///     */
///
///     // find all athletes that play tennis
///     var query = Athlete.find({ 'is_female': 'true' });
///
///     // selecting the 'name' and 'age' fields
///     query.select('cute_name description');
///
///     // limit our results to 5 items
///     query.limit(5);
///
///     // sort by cute_name
///     query.sort({ cute_name: -1 });
///
///     // execute the query at a later time
///     query.exec(function (err, athletes) {
///       if (err) return handleError(err);
///       // athletes contains an ordered list of 5 athletes who play Tennis
///     })
///
///
///   }



module.exports = {
    getPuppies: getPuppies,
    getAllPuppies: getAllPuppies,
    getPuppyById: getPuppyById,
    createPuppy: createPuppy,
    updatePuppyById: updatePuppyById,
    deletePuppyById: deletePuppyById
};
