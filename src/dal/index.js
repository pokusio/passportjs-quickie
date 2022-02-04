// getting-started.js
const mongoose = require('mongoose');
const winston = require('winston');
const fs = require('fs');

const pokus_environment = require("../environment/")
const pokus_secrets = require("../pokus_secrets/")
const puppies_mongoose_schemas = require("./models/puppy.schema")

const mongoUsername = pokus_secrets.getDatabaseSecrets().username;
const mongoUserPassword = pokus_secrets.getDatabaseSecrets().password;
const mongoDbName = pokus_secrets.getDatabaseSecrets().dbname;


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

// Set up default mongoose connection // "mongodb://pokus:pokus@mongo.pok-us.io:27017/pokus?ssl=false"
const mongoDbURI = `mongodb://${mongoUsername}:${mongoUserPassword}@192.168.254.6:27017/${mongoDbName}?authSource=admin&ssl=false&retryWrites=true&w=majority`;
/// mongoose.connect(mongoDbURI, {useNewUrlParser: true, useUnifiedTopology: true});
var theconnectionToPokusBoxDb = null;
try {
  theconnectionToPokusBoxDb = mongoose.connect(mongoDbURI, {useNewUrlParser: true, useUnifiedTopology: true});
  /// secretsAsRawJSON = fs.readFileSync(`${secretFilePath}`, 'utf8')
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** Connecting to MongoDB from Mongoose Using MongoDbURI = [${mongoDbURI}]  : `);
  pokus_logger.info(`/****** Connecting to MongoDB from Mongoose  : `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(JSON.stringify(theconnectionToPokusBoxDb, " ", 2))
  pokus_logger.info(`/************************************************************************* `);
} catch (err) {
  pokus_logger.error(err);
} finally {
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** Finished trying to Connect to MongoDB from Mongoose  `);
  pokus_logger.info(`/************************************************************************* `);
}
/// mongoose.connect(mongoDbURI);

//  Get the default connection, which is based on the above configuration, i.e. based on the configured [MongoDbURI]
var defaultConnection = mongoose.connection;
/// Bind connection to error event (to get notification of connection errors)
/// theconnectionToPokusBoxDb.on('error', pokus_logger.error.bind(console, 'MongoDB connection error:'));
defaultConnection.on('error', pokus_logger.error.bind(console, 'MongoDB connection error:'));
defaultConnection.on('error', function(err) { console.log(`JBL_MONGO_CHASER une erreur mpngo s'est produite : [${err.message}]`); });
defaultConnection.once('open', function() {
  console.log(`JBL_MONGO_CHASER la connection MongoDB pour Mongoose vient de s'ouvrir`);
});
defaultConnection.once('close', function() {
  console.log(`JBL_MONGO_CHASER la connection MongoDB pour Mongoose vient d'être cloturée`);
});
// theconnectionToPokusBoxDb does not have an "on" method // theconnectionToPokusBoxDb.on('error', pokus_logger.error.bind(console, 'MongoDB connection error:'));
/*
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://${pokus_environment.getEnvironment().db_net_fqdn}:${pokus_environment.getEnvironment().db_port_number}/${pokus_secrets.getDatabaseSecrets().dbname}`);
}
*/

// ---
// initialize the autoIncrement on Puppy Model, before getting the model (always)
//
// ---> If I use auto increment Plugin, Object Id is not of the right format anymore
//
// puppies_mongoose_schemas.initializeMongooseAutoIncrement(defaultConnection);
//
// Get the PuppyModel
const PuppyModel = puppies_mongoose_schemas.getModel().model

const handlecreatePuppyErrors = (err) => {
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
 * Retrieves the puppy with the specified 'puppyId'
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

  PuppyModel.find({ puppyId: puppyId }).then((docs) => {
      pokus_callback(docs);
  });
////  PuppyModel.findById(`${puppyId}`).then((docs) => {
////      pokus_callback(docs);
////  });

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
      return handlecreatePuppyErrors(err);
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
    createPuppy: createPuppy
};
