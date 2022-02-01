const passport = require("passport");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const pokus_environment = require("../environment/")
const pokus_secrets = require("../pokus_secrets/")

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
    callbackURL: `http://${pokus_environment.getEnvironment().net_fqdn}:${pokus_environment.getEnvironment().port_number}/google/callback`,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
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
