const mongoose = require('mongoose');
const winston = require('winston');

const users_mongoose_schemas = require("./../dal/models/user/user.schema")
const pokus_connections = require("./../dal/connection/pool/")


/*   const pokus_logger = pokus_logging.getLogger();  */
const pokus_logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});


const UserModel = users_mongoose_schemas.getModel().model


const getUserByRestreamIdOrCreate = (restreamProfile, restreamAccessToken, restreamRefreshToken) => {
   // restreamProfile.id      //  restream_profile_id
   // restreamAccessToken     //  restream_accessToken
   // restreamRefreshToken    //  restream_refreshToken

  pokus_logger.info(`ENTERING METHOD [src/controllers/authController.js] {getUserByRestreamIdOrCreate} `)
  pokus_logger.info(`ENTERING METHOD [src/controllers/authController.js] {getUserByRestreamIdOrCreate} `)
  pokus_logger.info(`ENTERING METHOD [src/controllers/authController.js] {getUserByRestreamIdOrCreate} `)
   // We try and find User of restream_profile_id [restreamProfile.id]
   return updateUserByRestreamOAuth2Profile(restreamProfile, restreamAccessToken, restreamRefreshToken);


   // If the user exists in the database, we check if accessToken and refreshToken match between database and received by http request

   // If the user does nto exists, then we create it

}


const updateUserByRestreamOAuth2Profile = (p_restream_profile, p_restream_accessToken, p_restream_refreshToken) => {
    let lapk = null; // used only if we have to create() the record
    const userFromReq = {
      // user_id: `${p_userId}`,
      fullname: p_restream_profile.name || `${p_restream_profile.id}`, // with social login, usename is set to the Social Net Profile ID
      // email: `${p_email}`, // maybe with cna get [email] from [restream_profile]
      // short_intro: `${p_short_intro}`, // maybe with can get [short_intro] from [restream_profile]
      // is_female: `${p_is_female}`, // maybe with can get [short_intro] from [restream_profile]
      // birth_date: `${p_birth_date}`, // maybe with can get [short_intro] from [restream_profile],
      email: `default@email.com`,
      short_intro: p_restream_profile.description || `default short intro`,
      is_female: p_restream_profile.is_female || false,
      birth_date: p_restream_profile.birth_date || `01/01/1970`,
      restream_profile_id: `${p_restream_profile.id}`,
      restream_accessToken: `${p_restream_accessToken}`,
      restream_refreshToken: `${p_restream_refreshToken}`
    }
    pokus_logger.info(`/***************************************************************************************************************** `);
    pokus_logger.info(`/******FINDME [authController.js], [updateUserByRestreamOAuth2Profile()] he user received from the http request is: `);
    pokus_logger.info(`/***************************************************************************************************************** `);
    /// pokus_logger.info(`    User [_id] : '${userFromReq.user_id}'`);
    pokus_logger.info(`    User [fullname] : '${userFromReq.fullname}'`);
    pokus_logger.info(`    User [email] : '${userFromReq.email}'`);
    pokus_logger.info(`    User [short_intro] : '${userFromReq.short_intro}'`);
    pokus_logger.info(`    User [is_female] : '${userFromReq.is_female}'`);
    pokus_logger.info(`    User [birth_date] : '${userFromReq.birth_date}'`);
    pokus_logger.info(`    User [restream_profile_id] : '${userFromReq.restream_profile_id}'`);
    pokus_logger.info(`    User [restream_accessToken] : '${userFromReq.restream_accessToken}'`);
    pokus_logger.info(`    User [restream_refreshToken] : '${userFromReq.restream_refreshToken}'`);
    /// pokus_logger.info(request.body);
    pokus_logger.info(JSON.stringify(userFromReq, " ", 2));
    pokus_logger.info(`/***************************************************************************************************************** `);

    /// let pokusResponseCode = 599;
    /// let pokusResponseJSON = {};
    try {

      pokus_logger.info(`/***************************************************************************************************************** `);
      pokus_logger.info(`/****** TRACKER 2 - [authController.js], [updateUserByRestreamOAuth2Profile = ()] , inspect [userId] param : `);
      pokus_logger.info(`/***************************************************************************************************************** `);
      pokus_logger.info(`    User [restream_profile_id] : [${userFromReq.restream_profile_id}] `);
      pokus_logger.info(`/***************************************************************************************************************** `);
      pokus_logger.info(`/***************************************************************************************************************** `);
      pokus_logger.info(`/****** [authController.js], [updateUserByRestreamOAuth2Profile = ()] , updating user of 'restream_profile_id' equal to : [${userFromReq.restream_profile_id}]`);
      pokus_logger.info(`/****************************************************s********************* `);
      pokus_logger.info(`/** `);

      UserModel.find({ restream_profile_id: userFromReq.restream_profile_id }).then((results) => { // there is a unique constraints on [restream_profile_id]
        // -- // -
        // pokus_callback(results);
        // -- // -
        // if we do find the user, then we update, otherwise we throw an Exception

        pokus_logger.info(`/***************************************************************************************************************** `);
        pokus_logger.info(`/****** [authController.js], [updateUserByRestreamOAuth2Profile = ()], updating user of 'restream_profile_id' equal to : [${userFromReq.restream_profile_id}]`);
        pokus_logger.info(`/***************************************************************************************************************** `);
        pokus_logger.info(`/** Ok so here are the results i get from UserModel.find : `);
        pokus_logger.info(`${JSON.stringify(results, " ", 2)}`);
        pokus_logger.info(`results.length=[${results.length}]`);
        pokus_logger.info(`/** Ok so  : `);
        /// if (results == {}) { // so the user was not found
        /// if (results == []) { // so the user was not found
        let new_user_to_create = null;
        if (results.length == 0) { // so the user was not found
          //
            pokus_logger.warn(`##### ==>>>> TRACKER JB R+1`);
            pokus_logger.warn(`[authController.js], [updateUserByRestreamOAuth2Profile = ()], The user of Restream ID [${userFromReq.restream_profile_id}] was not found in the database, so it cannot be updated`);
            pokusResponseCode = 404; /// '200 OK' (and not '201  Created'), nothing is created, only updated

            /*
            pokusResponseJSON = {
              message: `Pokus [PUT /api/v1/users], [updateUserByRestreamOAuth2Profile()]: the user of id [${userFromReq.user_id}] does not exists in the database, so it cannot be updated to : ${JSON.stringify(userFromReq, " ", 2)}`,
              user: userFromReq
            };
            p_response.status(pokusResponseCode);
            p_response.json(pokusResponseJSON);
            */
            pokus_logger.warn(`[authController.js], [updateUserByRestreamOAuth2Profile = ()], The user of Restream ID [${userFromReq.restream_profile_id}] was not found : So we will create the Restream authenticatted user `);

            /// --- /// --- /// --- /// --- /// --- /// --- /// --- ///
            // Create an instance of model UserModel
            lapk = mongoose.Types.ObjectId();
            new_user_to_create = new UserModel({
              // userId: `${mongoose.Types.ObjectId()}`,
              _id: `${lapk}`,
              fullname: p_restream_profile.name || `${p_restream_profile.id}`,
              email: `default@email.com`,
              short_intro: p_restream_profile.description || `default short intro`,
              is_female: p_restream_profile.is_female || false,
              birth_date: p_restream_profile.birth_date || `01/01/1970`,
              restream_profile_id: `${p_restream_profile.id}`,
              restream_accessToken: `${p_restream_accessToken}`,
              restream_refreshToken: `${p_restream_refreshToken}`
            }, { collection: 'users', database: 'pokus' });

            /// --- /// --- /// --- /// --- /// --- /// --- /// --- ///
            // Save the new model instance, passing a callback
            new_user_to_create.save(function (err) {
              /// if (err) return handleError(err);
              if (err) {
                pokus_logger.error(`/**************************************************************************************************************** `);
                pokus_logger.error(`/****** [authController.js], [updateUserByRestreamOAuth2Profile = ()], Saving User FAILED!!!`);
                pokus_logger.error(new_user_to_create);
                pokus_logger.error(`/**************************************************************************************************************** `);
                pokus_logger.error(err);
                throw err;
              } else {
                pokus_logger.info(`/***************************************************************************************************************** `);
                pokus_logger.info(`/****** [authController.js], [updateUserByRestreamOAuth2Profile = ()], User  saved! test SUCCESSFUL!!`);
                pokus_logger.error(new_user_to_create);
                pokus_logger.info(`/***************************************************************************************************************** `);
                /// ---
                // And now we update our user with thre restream.io 'Profile ID', 'accessToken', 'refreshToken'
                updateUserRestreamInfosById(lapk, p_restream_profile, p_restream_accessToken, p_restream_refreshToken);
              }
              // saved!
            });
            return new_user_to_create
        } else { //The useer already exists, so we jusst have to update it
          /// lapk = mongoose.Types.ObjectId();
          lapk = results[0]._id;
          let user_to_update = new UserModel({
            // userId: `${mongoose.Types.ObjectId()}`,
            _id: `${lapk}`,
            fullname: p_restream_profile.name || `${p_restream_profile.id}`,
            email: `default@email.com`,
            short_intro: p_restream_profile.description || `default short intro`,
            is_female: p_restream_profile.is_female || false,
            birth_date: p_restream_profile.birth_date || `01/01/1970`,
            restream_profile_id: `${p_restream_profile.id}`,
            restream_accessToken: `${p_restream_accessToken}`,
            restream_refreshToken: `${p_restream_refreshToken}`
          }, { collection: 'users', database: 'pokus' });

          /// ---
          // And now we update our user with thre restream.io 'Profile ID', 'accessToken', 'refreshToken'
          updateUserRestreamInfosById(lapk, p_restream_profile, p_restream_accessToken, p_restream_refreshToken);
          return user_to_update
        }



      });
    } catch (error) {
      pokus_logger.error(`Pokus [authController.js], [updateUserByRestreamOAuth2Profile = ()], : An error occured while trying to update the user below attached, in the pokus database. Error message : [${error}]`);
      pokus_logger.error(error);
      // p_response.status(pokusResponseCode);
      // p_response.json(pokusResponseJSON);
    } finally {
      pokus_logger.error(`/**************************************************************************************************************** `);
      pokus_logger.error(`/****** [authController.js], [updateUserByRestreamOAuth2Profile = ()], METHOD COMPLETED!!!`);
      pokus_logger.error(`/**************************************************************************************************************** `);
    }
}

const updateUserRestreamInfosById = (lapk, p_restream_profile, p_restream_accessToken, p_restream_refreshToken) => {
  const userFromReq = {
    user_id: `${lapk}`,
    fullname: `${p_restream_profile.id}`, // with social login, usename is set to the Social Net Profile ID
    // email: `${p_email}`, // maybe with cna get [email] from [restream_profile]
    // short_intro: `${p_short_intro}`, // maybe with can get [short_intro] from [restream_profile]
    // is_female: `${p_is_female}`, // maybe with can get [short_intro] from [restream_profile]
    // birth_date: `${p_birth_date}`, // maybe with can get [short_intro] from [restream_profile]
    restream_profile_id: `${p_restream_profile.id}`,
    restream_accessToken: `${p_restream_accessToken}`,
    restream_refreshToken: `${p_restream_refreshToken}`
  }
  /// The User is now created if it did not already exists. And we update their restram.io infos (accessToken, refreshToken, profile id)
  pokus_logger.error(`##### ==>>>> TRACKER JB R+2`);
  pokus_logger.info(`[authController.js], [updateUserByRestreamOAuth2Profile = ()], The user of ID [${userFromReq.user_id}] was found, so we can update it :  `);
  // userFromReq.user_id = lapk;
  UserModel.findByIdAndUpdate(lapk, userFromReq, function(mongooseErr, result) {

      if(mongooseErr){
          // res.send(err)
          pokus_logger.error(`[authController.js], [updateUserByRestreamOAuth2Profile = ()], There was an error while updating user of id [${userFromReq.user_id}], to  [${JSON.stringify(userFromReq, " ", 2)}]`);
          pokus_logger.error(mongooseErr);
          ///   pokusResponseCode = 500; /// '200 OK' (and not '201  Created'), nothing is created, only updated
          ///   pokusResponseJSON = {
            ///   message: `Pokus [PUT /api/v1/users], [updateUserByRestreamOAuth2Profile()]: the user below described user was successfully updated in the database : ${JSON.stringify(userFromReq, " ", 2)}`,
            ///   user: userFromReq,
            ///   rootError: mongooseErr
          ///   };
          ///   p_response.status(pokusResponseCode);
          ///   p_response.json(pokusResponseJSON);
          throw new Error(`[authController.js], [updateUserByRestreamOAuth2Profile = ()], There was an error while updating user of id [${userFromReq.user_id}], to  [${JSON.stringify(userFromReq, " ", 2)}]. Root Cause is [${mongooseErr}]`);
      }
      else {
          // res.send(result)
          pokus_logger.info(`[authController.js], [updateUserByRestreamOAuth2Profile = ()], Successfully updated user of id [${userFromReq.user_id}], to  [${JSON.stringify(userFromReq, " ", 2)}]`);
          //  pokusResponseCode = 200; /// '200 OK' (and not '201  Created'), nothing is created, only updated
          //  pokusResponseJSON = {
            //  message: `Pokus [PUT /api/v1/users], [updateUserByRestreamOAuth2Profile()]: the user below described user was successfully updated in the database : ${JSON.stringify(userFromReq, " ", 2)}`,
            //  user: userFromReq
          //  };
          //  p_response.status(pokusResponseCode);
          //  p_response.json(pokusResponseJSON);
      }

  })

}

module.exports = {
    getUserByRestreamIdOrCreate: getUserByRestreamIdOrCreate
};
