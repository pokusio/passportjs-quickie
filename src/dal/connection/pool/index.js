// getting-started.js
const mongoose = require('mongoose');
const winston = require('winston');
const fs = require('fs');

const pokus_environment = require("../../../environment/")
const pokus_secrets = require("../../../pokus_secrets/")

const mongoUsername = pokus_secrets.getDatabaseSecrets().username;
const mongoUserPassword = pokus_secrets.getDatabaseSecrets().password;
const mongoDbName = pokus_secrets.getDatabaseSecrets().dbname;


/*   const pokus_logger = pokus_logging.getLogger();  */
const pokus_logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});

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

/**
 * Returns an array of mongoose connections to the MongoDb PokusBox Database
 **/
const getConnectionPool = () => {
  return [
    {
      name: `defaultConnection`,
      connection: defaultConnection
    }
  ]
}

module.exports = {
    getConnectionPool: getConnectionPool
};
