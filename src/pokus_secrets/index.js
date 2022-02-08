const winston = require('winston');

const pokus_logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});

/**
 * Secret Manager reads secrets from file, and will later read from hashcorp vault
 */
const secretFilePath = process.env.POKUS_SECRET_FILE_PATH || `pokus.secrets.json`;


const fs = require('fs')

let secretsAsRawJSON = {};
let loadedSecretJson = {};
try {
  secretsAsRawJSON = fs.readFileSync(`${secretFilePath}`, 'utf8')
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** Loading Pokus Secrets File  : `);
  pokus_logger.info(`/************************************************************************* `);
  loadedSecretJson = JSON.parse(secretsAsRawJSON);
  pokus_logger.info(JSON.stringify(loadedSecretJson, " ", 2))
  pokus_logger.info(`/************************************************************************* `);
} catch (err) {
  pokus_logger.error(err);
}



const getSecrets = () => {
  return loadedSecretJson;
}

const getRestreamioOauth2Secrets = () => {
    return {
      clientID: `${loadedSecretJson.auth.restream.clientID}`,
      clientSecret: `${loadedSecretJson.auth.restream.clientSecret}`
    }
}
const getGoogleOauth2Secrets = () => {
    return {
      clientID: `${loadedSecretJson.auth.google.clientID}`,
      clientSecret: `${loadedSecretJson.auth.google.clientSecret}`
    }
}
const getDatabaseSecrets = () => {
    return {
      username: `${loadedSecretJson.auth.mongoose.username}`,
      password: `${loadedSecretJson.auth.mongoose.password}`,
      dbname: `${loadedSecretJson.auth.mongoose.dbname}`
    }
}

/// -------- -------- -------- -------- -------- -------- -------- -------- -------- ///
/// -------- -------- -------- -------- -------- -------- -------- -------- -------- ///
/// -------- -------- -------- -------- -------- -------- -------- -------- -------- ///
///          {
///            auth: {
///              google: {
///                clientID: "fzedfsefs",
///                clientSecret: "dsdfsdfsdf"
///              },
///              restream: {
///                clientID: "78ec5929-25b9-49e3-a1e9-b026cba85304",
///                clientSecret: "e6f686d7-c999-434e-9a0f-8ae20ce9c7f6"
///              }
///            }
///          }
/// -------- -------- -------- -------- -------- -------- -------- -------- -------- ///
/// -------- -------- -------- -------- -------- -------- -------- -------- -------- ///
/// -------- -------- -------- -------- -------- -------- -------- -------- -------- ///

pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`/****** Finnally Loaded PokusBox secrets : `);
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`    [loadedSecretJson] : ${JSON.stringify(loadedSecretJson, " ", 2)}`);
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`    [loadedSecretJson] : `);
pokus_logger.info(JSON.stringify(loadedSecretJson, " ", 2));
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`    loadedSecretJson.auth.restream.clientID=[${loadedSecretJson.auth.restream.clientID}]   `);
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`    loadedSecretJson.auth.restream.clientSecret=[${loadedSecretJson.auth.restream.clientSecret}]   `);
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`    loadedSecretJson.auth.google.clientID=[${loadedSecretJson.auth.google.clientID}}]   `);
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`    loadedSecretJson.auth.google.clientSecret=[${loadedSecretJson.auth.google.clientSecret}]   `);
pokus_logger.info(`/************************************************************************* `);



module.exports = {
    getSecrets: getSecrets,
    getRestreamioOauth2Secrets: getRestreamioOauth2Secrets,
    getGoogleOauth2Secrets: getGoogleOauth2Secrets,
    getDatabaseSecrets: getDatabaseSecrets
};
