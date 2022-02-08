const passport = require("passport");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const winston = require('winston');




const pokus_environment = require("../../environment/")
const pokus_secrets = require("../../pokus_secrets/")

const pokusClientID = pokus_secrets.getRestreamioOauth2Secrets().clientID;
const pokusClientSecret = pokus_secrets.getRestreamioOauth2Secrets().clientSecret;

/*   const pokus_logger = pokus_logging.getLogger();  */
const pokus_logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});
/************************************************************************************
 *   cccccccccccc ?
 *    -->  cccc
 *    -->  cccc
 *    -->  cccccccccccc ?
 *    -->  cccccccccccc :
 *         ++ > cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc :
 *              + cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
 *              + cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
 *              + cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
 *              + cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
 *         ++ > ccccccccccccccccccccccccccccccccccc
 *
 *    -->  cccccccccccc ?
 *    -->  cccccccccccc :
 *
 *
 *
 *
 *
 *
 **************/



passport.use(new GoogleStrategy({
    clientID: pokus_secrets.getRestreamioOauth2Secrets().clientID, //
    clientSecret: pokus_secrets.getRestreamioOauth2Secrets().clientID, //
    callbackURL: `http://${pokus_environment.getEnvironment().net_fqdn}:${pokus_environment.getEnvironment().port_number}/oauth2/google/callback`,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    pokus_logger.error(`Not Implemented`);
    throw new Error(`Not Implemented`)
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));


///
/*
module.exports = {
    getAuthModulesVersions: getAuthModulesVersions,
    authenticate: authenticate
};
*/
