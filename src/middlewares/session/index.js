const mongoose = require('mongoose');
const winston = require('winston');
const session = require('express-session');
const MongoStore = require('connect-mongo');



const pokus_environment = require("../../environment/")
const pokus_secrets = require("../../pokus_secrets/")

const mongoUsername = pokus_secrets.getDatabaseSecrets().username;
const mongoUserPassword = pokus_secrets.getDatabaseSecrets().password;
const mongoDbName = pokus_secrets.getDatabaseSecrets().dbname;
const httpSessionMongoStoreDbName = pokus_secrets.getDatabaseSecrets().mongostore_dbname;

const pokus_logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});

// // "mongodb://pokus:pokus@mongo.pok-us.io:27017/pokus?ssl=false"
const mongoDbURI = `mongodb://${mongoUsername}:${mongoUserPassword}@192.168.1.101:27017/${httpSessionMongoStoreDbName}?authSource=admin&ssl=false&retryWrites=true&w=majority`;



pokus_logger.info(`PETIT REPERE JB>>>>>>>>>>>>>>>>>>>>>>>>><<`)
const httpSessionMongoStore = new MongoStore({
        mongoUrl: `${mongoDbURI}`,
        collection: `${httpSessionMongoStoreDbName}s_collection`/*,
        ttl: 30 * 24 * 60 * 60 // = 30 days */
    })
/**
 * Returns an array of mongoose connections to the MongoDb PokusBox Database
 **/
const getHttpSessionMongoStore = () => {
  return httpSessionMongoStore;
}


/// const connectMongo = require('connect-mongo');
/// var MongoStore = connectMongo(session);
module.exports = {
    getHttpSessionMongoStore: getHttpSessionMongoStore
};
