// getting-started.js
const mongoose = require('mongoose');

const pokus_environment = require("../../environment/")
const pokus_secrets = require("../../pokus_secrets/")


const mongoUsername = pokus_secrets.getDatabaseSecrets().username;
const mongoUserPassword = pokus_secrets.getDatabaseSecrets().password;
const mongoDbName = pokus_secrets.getDatabaseSecrets().db_name;

// callbackURL: `http:///restream/callback`
// },

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://${pokus_environment.getEnvironment().db_net_fqdn}:${pokus_environment.getEnvironment().db_port_number}/${pokus_secrets.getDatabaseSecrets().db_name}`);
}
