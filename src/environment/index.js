const winston = require('winston');

const pokus_logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});

const tlsEnabled = process.env.TLS_ENABLED || false;
const port_number = process.env.POKUS_PORT || `9099`;
const net_fqdn = process.env.POKUS_NET_HOST || `127.0.0.1`;
const db_net_fqdn = process.env.POKUS_DB_NET_FQDN || `127.0.0.1`;
const db_port_number = process.env.POKUS_DB_PORT_NUMBER || `27017`;
const secretFilePath = process.env.POKUS_SECRET_FILE_PATH || `./pokus.secrets.json`;


pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`/****** Loading PokusBox environment : `);
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`    [process.env.TLS_ENABLED] : ${process.env.TLS_ENABLED}`);
pokus_logger.info(`    [process.env.POKUS_PORT] : ${process.env.POKUS_PORT}`);
pokus_logger.info(`    [process.env.POKUS_NET_HOST] : ${process.env.POKUS_NET_HOST}`);
pokus_logger.info(`    [process.env.POKUS_DB_NET_FQDN] : ${process.env.POKUS_DB_NET_FQDN}`);
pokus_logger.info(`    [process.env.POKUS_DB_PORT_NUMBER] : ${process.env.POKUS_DB_PORT_NUMBER}`);
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`/****** Loading PokusBox environment (after defaults) : `);
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`    [tlsEnabled] : ${tlsEnabled}`);
pokus_logger.info(`    [port_number] : ${port_number}`);
pokus_logger.info(`    [net_fqdn] : ${net_fqdn}`);
pokus_logger.info(`    [db_net_fqdn] : ${db_net_fqdn}`);
pokus_logger.info(`    [db_port_number] : ${db_port_number}`);
pokus_logger.info(`/************************************************************************* `);

const getEnvironment = () => {
  return {
    tsl_enabled: tlsEnabled,
    port_number: `${port_number}`,
    net_fqdn: `${net_fqdn}`,
    db_net_fqdn: `${db_net_fqdn}`,
    secret_file_path: `${secretFilePath}`,
    db_port_number: `${db_port_number}`
  }
}

module.exports = {
    getEnvironment: getEnvironment
};
