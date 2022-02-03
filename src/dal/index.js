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
const mongoDbURI = `mongodb://${mongoUsername}:${mongoUserPassword}@192.168.82.6:27017/${mongoDbName}?authSource=admin&ssl=false&retryWrites=true&w=majority`;
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

// theconnectionToPokusBoxDb does not have an "on" method // theconnectionToPokusBoxDb.on('error', pokus_logger.error.bind(console, 'MongoDB connection error:'));
/*
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://${pokus_environment.getEnvironment().db_net_fqdn}:${pokus_environment.getEnvironment().db_port_number}/${pokus_secrets.getDatabaseSecrets().dbname}`);
}
*/


// initialize the autoIncrement on Puppy Model, before getting the model (always)
puppies_mongoose_schemas.initializeMongooseAutoIncrement(defaultConnection);

// Get the PuppyModel
const PuppyModel = puppies_mongoose_schemas.getModel().model

const handletestDbWritesErrors = (err) => {
  pokus_logger.error(`-----------------------------------------------------------------------------`);
  pokus_logger.error(`An error occured during the execution of  [testDbWrites = () => {] : `);
  pokus_logger.error(err);
  pokus_logger.error(`-----------------------------------------------------------------------------`);
}
const handletestDbReadsErrors = (err) => {
  pokus_logger.error(`-----------------------------------------------------------------------------`);
  pokus_logger.error(`An error occured during the execution of  [testDbReads = () => {] : `);
  pokus_logger.error(err);
  pokus_logger.error(`-----------------------------------------------------------------------------`);
}
/**
 * Test: insert a new puppy into the database, with :
 * @parameter p_cute_name String
 * @parameter p_is_female Boolean
 * @parameter p_description String
 ***/
const testDbWrites = (p_cute_name, p_is_female, p_description) => {
  /// var PuppySchema = new Schema({
    /// cute_name: String,
    /// description: String,
    /// is_female: Boolean,
    /// birth_date: Date
  /// });

  /// --- /// --- /// --- /// --- /// --- /// --- /// --- ///
  // Create an instance of model PuppyModel
  var cutest_puppy = new PuppyModel({
    cute_name: `${p_cute_name}`,
    is_female: p_is_female,
    description: `${p_description}`
  }, { collection: 'puppies', database: 'pokus' });

  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [testDbWrites = ()] , test inserting a new puppy: `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    Puppy [cute_name] : '${p_cute_name}'`);
  pokus_logger.info(`    Puppy [is_female] : ${p_is_female}`);
  pokus_logger.info(`    Puppy [description] : "${p_description}"`);
  pokus_logger.info(`/************************************************************************* `);

  /// --- /// --- /// --- /// --- /// --- /// --- /// --- ///
  // Save the new model instance, passing a callback
  cutest_puppy.save(function (err) {
    /// if (err) return handleError(err);
    if (err) {
      pokus_logger.error(`/************************************************************************* `);
      pokus_logger.error(`/****** [testDbWrites = ()] Saving Puppy FAILED!!!`);
      pokus_logger.error(`/************************************************************************* `);
      return handletestDbWritesErrors(err);
    } else {
      pokus_logger.info(`/************************************************************************* `);
      pokus_logger.info(`/****** [testDbWrites = ()] Puppy  saved! test SUCCESSFUL!!`);
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

const getPuppies = () => {
  return {
    une: false,
    deux: `peu de choses`,
    trois: `trois petites choses`,
  }
}

module.exports = {
    getPuppies: getPuppies,
    testDbWrites: testDbWrites
};
