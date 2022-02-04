const passport = require("passport");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const pokus_environment = require("../../environment/")
const pokus_secrets = require("../../pokus_secrets/")


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

passport.use(new OAuth2Strategy({
   authorizationURL: 'https://api.restream.io/login', // https://developers.restream.io/docs
   tokenURL: 'https://api.restream.io/oauth/token', // https://developers.restream.io/docs#refreshing-tokens
   clientID: pokus_secrets.getRestreamioOauth2Secrets().clientID, //
   clientSecret: pokus_secrets.getRestreamioOauth2Secrets().clientID, //
   callbackURL: `http://${pokus_environment.getEnvironment().net_fqdn}:${pokus_environment.getEnvironment().port_number}/restream/callback`
 },
 function(accessToken, refreshToken, profile, cb) {
   User.findOrCreate({ exampleId: profile.id }, function (err, user) {
     return cb(err, user);
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
