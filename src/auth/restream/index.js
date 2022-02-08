const passport = require("passport");
const OAuth2Strategy = require( 'passport-oauth2' ).Strategy;
const winston = require('winston');

const pokus_environment = require("../../environment/")
const pokus_secrets = require("../../pokus_secrets/")

const pokusClientID = pokus_secrets.getRestreamioOauth2Secrets().clientID;
/// const pokusClientSecret = pokus_secrets.getRestreamioOauth2Secrets().clientSecret;
/// const pokusClientID = `pokus_secrets.getRestreamioOauth2Secrets().clientID`;
const pokusClientSecret = pokus_secrets.getRestreamioOauth2Secrets().clientSecret;
/// const pokusClientSecret = `pokus_secrets.getRestreamioOauth2Secrets().clientSecret`;
/// const pokusClientSecret = `pokus_secrets.getRestreamioOauth2Secrets().clientSecret`;
const pokus_connections = require("./../../dal/connection/pool/")

/*   const pokus_logger = pokus_logging.getLogger();  */
const pokus_logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});


pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`/****** +++ [./AUTH/RESTREAM/INDEX.JS]   pokusClientID   =  [${pokusClientID}]  : `);
pokus_logger.info(`/****** +++ [./AUTH/RESTREAM/INDEX.JS]   pokusClientSecret   =  [${pokusClientSecret}]  : `);
pokus_logger.info(`/************************************************************************* `);
const authController = require("../../controllers/authController");

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
 *   https://www.passportjs.org/packages/passport-oauth2/
 *
 *
 * Restream API Oauth2 scopes :
 * https://developers.restream.io/docs#upcoming-events, see the note `Required scopes: stream.read` below setion title
 * https://developers.restream.io/docs#in-progress-events, see the note `Required scopes: stream.read` below setion title
 **************/

pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`/*****************  .. MOODULE LOADING .. `);
pokus_logger.info(`/****** +++ [./AUTH/RESTREAM/INDEX.JS]   pokusClientID   =  [${pokusClientID}]  : `);
pokus_logger.info(`/****** +++ [./AUTH/RESTREAM/INDEX.JS]   pokusClientSecret   =  [${pokusClientSecret}]  : `);
pokus_logger.info(`/************************************************************************* `);

passport.use(new OAuth2Strategy({
   authorizationURL: 'https://api.restream.io/login', // https://developers.restream.io/docs
   tokenURL: 'https://api.restream.io/oauth/token', // https://developers.restream.io/docs#refreshing-tokens
   clientID: `${pokusClientID}`, //
   clientSecret: `${pokusClientSecret}`, //
   callbackURL: `http://${pokus_environment.getEnvironment().net_fqdn}:${pokus_environment.getEnvironment().port_number}/oauth2/restream/callback`
 },
 /// --- ///
 function(accessToken, refreshToken, profile, cb) { /// store accessToken refreshToken in clear ? hash its impossible we need the clear values
   /// --- ///
   /// handlers.updateHandler(request, response, next);
   /// --- /// https://github.com/Aidanator17/DevWebAppLAB6/blob/a69c69391f4af397e551719ba125928953a88f4c/middleware/passport.js#L112
   /// --- ///
   pokus_logger.info(`/****************************************************************************************** `);
   pokus_logger.info(`/****************** !!!!!!RESTREEAM OAUTH2 FLOW !!!! `);
   pokus_logger.info(`/****************************************************************************************** `);
   pokus_logger.info(`/****** +++ [./AUTH/RESTREAM/INDEX.JS] [function(accessToken, refreshToken, profile, cb)] : `);
   pokus_logger.info(`/--------------------- `);
   pokus_logger.info(`/****** +++       accessToken  : `);
   pokus_logger.info(accessToken);
   pokus_logger.info(`/--------------------- `);
   pokus_logger.info(`/****** +++       refreshToken  : `);
   pokus_logger.info(refreshToken);
   pokus_logger.info(`/--------------------- `);
   pokus_logger.info(`/****** +++       profile : `);
   pokus_logger.info(profile);
   pokus_logger.info(`/--------------------- `);
   pokus_logger.info(`/****************************************************************************************** `);
   pokus_logger.info(`/****************************************************************************************** `);
   // console.log("!!!!!!RESTREEAM OAUTH !!!!",profile)
   let user = authController.getUserByRestreamIdOrCreate(profile, accessToken, refreshToken)
   return cb(null, user);

   /// --- ///
   /*
   User.findOrCreate({ exampleId: profile.id }, function (err, user) {
     return cb(err, user);
   });
   */
 }

));

passport.serializeUser((user, done) => {
  done(null, user);
})
///
/*
module.exports = {
    getAuthModulesVersions: getAuthModulesVersions,
    authenticate: authenticate
};
*/


/****
 *
 * ------------------------------ - - - - -
 * ------------------------------ - - - - -
 *
 * ---->>>  pokus permissions:
 * ---->>>     -  Read your account profile
 * ---->>>     -  Read your channel information
 * ---->>>     -  Read your webchat messages
 * ---->>>     -  Post messages to your webchat on your behalf
 * ---->>>     -  Write your channel information
 * ---->>>     -  Read your account stream key
 *
 * ------------------------------ - - - - -
 * ------------------------------ - - - - -
 *
 **/
