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

let secretsAsJSON = {}

try {
  secretsAsJSON = fs.readFileSync(`${secretFilePath}`, 'utf8')
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** Loading Pokus Secrets  : `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.log(JSON.Stringify§(secretsAsJSON, " ", 2))
} catch (err) {
  pokus_logger.error(err)
}

const loadedSecretJson = secretsAsJSON;

const getSecrets() = () {
  return loadedSecretJson
}

const getRestreamioOauth2Secrets() = () {
    return {
      clientID: `${loadedSecretJson.auth.restream.clientID}`,
      clientSecret: `${loadedSecretJson.auth.restream.clientSecret}`
    }
}
const getGoogleOauth2Secrets() = () {
    return {
      clientID: `${loadedSecretJson.auth.google.clientID}`,
      clientSecret: `${loadedSecretJson.auth.google.clientSecret}`
    }
}
const getDatabaseSecrets() = () {
    return {
      username: `${loadedSecretJson.auth.mongoose.username}`,
      password: `${loadedSecretJson.auth.mongoose.password}`
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
pokus_logger.info(`/****** Loading PokusBox environment : `);
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`    [process.env.TLS_ENABLED] : ${process.env.TLS_ENABLED}`);
pokus_logger.info(`    [process.env.POKUS_PORT] : ${process.env.POKUS_PORT}`);
pokus_logger.info(`    [process.env.POKUS_NET_HOST] : ${process.env.POKUS_NET_HOST}`);



pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`/****** Loading PokusBox environment (after defaults) : `);
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`    [tlsEnabled] : ${tlsEnabled}`);
pokus_logger.info(`    [port_number] : ${port_number}`);
pokus_logger.info(`    [net_fqdn] : ${net_fqdn}`);
pokus_logger.info(`/************************************************************************* `);

const getEnvironment = () => {
  return {
    tsl_enabled: tlsEnabled,
    port_number: `${port_number}`,
    net_fqdn: `${net_fqdn}`
  }
}

module.exports = {
    getEnvironment: getEnvironment
};
