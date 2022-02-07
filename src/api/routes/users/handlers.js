// getting-started.js
const mongoose = require('mongoose');
const winston = require('winston');

const users_mongoose_schemas = require("./../../../dal/models/user/user.schema")
const pokus_connections = require("./../../../dal/connection/pool/")

const pokus_environment = require("./../../../environment/")
const pokus_users_dal = require("./../../../dal/models/user/")


/*   const pokus_logger = pokus_logging.getLogger();  */
const pokus_logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});

/*
try {
  pokus_logger.info(`/****** JBL DEBUG POINT is tracking an error`);
} catch (trackedError) {
  pokus_logger.info(`/****** JBL DEBUG POINT error found :`);
  pokus_logger.error(trackedError);

} finally {
  pokus_logger.info(`/****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!* `);
  pokus_logger.info(`/****** JBL DEBUG POINT`);
  pokus_logger.info(`/****** JBL DEBUG POINT`);
  pokus_logger.info(`/****** JBL DEBUG POINT`);
  pokus_logger.info(`/****** JBL DEBUG POINT`);
  pokus_logger.info(`/****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!****!!!!!!!* `);
}
*/


// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // DELETE HANDLER // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
const deleteHandler = (request, response, next) => {

    // 1./ display 'retrieved query params' BEFORE any string operation
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/****** FINDME [DELETE /api/v1/users] Router,    : [${request.query.user_id}] `);
    pokus_logger.info(`/************************************************************************* `);

    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/******FINDME [DELETE /api/v1/users] Router, The user received from the http request is: `);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`    User [request.query.user_id] : '${request.query.user_id}'`);
    pokus_logger.info(`/************************************************************************* `);



    pokus_logger.info(` Pokus [DELETE /api/v1/users]: the user to delete in the database `);
    pokus_users_dal.deleteUserById(response, request.query.user_id);

};




// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // CREATE HANDLER // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
const createHandler = (request, response, next) => {
  let stringifiedBody = JSON.stringify(request.body, " ", 2);

  // 1./ display 'stringifiedBody' BEFORE any string operation
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** FINDME [POST /api/v1/users] Router,    [1./ display 'stringifiedBody' BEFORE any string operation]  : `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(stringifiedBody);

  // 2./ run operations on string
  let editedStringifiedBody = stringifiedBody
  // -> remove last character : a closing curly bracket
  editedStringifiedBody = editedStringifiedBody.slice(0, -1)
  // -> remove the 5 firsts characters : an opening curly bracket '    {'
  editedStringifiedBody = editedStringifiedBody.substring(5)
  // --> Okay, so removing first and last characters removed unwanted opening and closing brakcets: but e still have 6 remaining unwanted charaters, namely ': ""  ',at the end of the string, let's remove them :
  // -> remove the 4 last characters : a closing curly bracket
  editedStringifiedBody = editedStringifiedBody.slice(0, -1)
  editedStringifiedBody = editedStringifiedBody.slice(0, -1)
  editedStringifiedBody = editedStringifiedBody.slice(0, -1)
  editedStringifiedBody = editedStringifiedBody.slice(0, -1)
  editedStringifiedBody = editedStringifiedBody.slice(0, -1)
  editedStringifiedBody = editedStringifiedBody.slice(0, -1)

  // Remove all occurences of backslash :
  editedStringifiedBody = editedStringifiedBody.replace(/\\/g,'')

  // 3./ display 'stringifiedBody' AFTER operations
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** FINDME [POST /api/v1/users] Router,    [3./ display 'stringifiedBody' AFTER any string operation]  : `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [stringifiedBody]  : `);
  pokus_logger.info(stringifiedBody);
  pokus_logger.info(`/****** [editedStringifiedBody]  : `);
  pokus_logger.info(editedStringifiedBody);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/************************************************************************* `);

  let parsedBody = JSON.parse(editedStringifiedBody);
  request.body = parsedBody;




      /// const createUser(p_email, p_email, p_short_intro, p_is_female, p_birth_date)
      /// userFromReq.email, userFromReq.email, userFromReq.short_intro, userFromReq.is_female, userFromReq.birth_date
  const userFromReq = {
    fullname: `${parsedBody.fullname}`,
    email: `${parsedBody.email}`,
    short_intro: `${parsedBody.short_intro}`,
    is_female: parsedBody.is_female,
    birth_date: `${parsedBody.birth_date}`
  }

  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/******FINDME [POST /api/v1/users] Router, The user received from the http request is: `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    User [request.body.fullname] : '${request.body.fullname}'`);
  pokus_logger.info(`    User [request.body.email] : '${request.body.email}'`);
  pokus_logger.info(`    User [request.body.short_intro] : ${request.body.short_intro}`);
  pokus_logger.info(`    User [request.body.is_female] : "${request.body.is_female}"`);
  pokus_logger.info(`    User [request.body.birth_date] : "${request.body.birth_date}"`);
  pokus_logger.info(`    User [parsedBody.fullname] : '${parsedBody.fullname}'`);
  pokus_logger.info(`    User [parsedBody.email] : '${parsedBody.email}'`);
  pokus_logger.info(`    User [parsedBody.short_intro] : ${parsedBody.short_intro}`);
  pokus_logger.info(`    User [parsedBody.is_female] : "${parsedBody.is_female}"`);
  pokus_logger.info(`    User [parsedBody.birth_date] : "${parsedBody.birth_date}"`);
  pokus_logger.info(`    User [request.body] : `);
  /// pokus_logger.info(request.body);
  pokus_logger.info(JSON.stringify(request.body, " ", 2));
  pokus_logger.info(`/************************************************************************* `);


  let requested_url_str = request.url;

  pokus_logger.info(` Pokus [POST /api/v1/users]: the user to add to the database is : ${JSON.stringify(userFromReq, " ", 2)} rendering 404 page for requested page : ${requested_url_str}`);

  let pokusResponseCode = 599;
  let pokusResponseJSON = {};
  try {

    /// const createUser(p_email, p_email, p_short_intro, p_is_female, p_birth_date)
    /// userFromReq.email, userFromReq.email, userFromReq.short_intro, userFromReq.is_female, userFromReq.birth_date
    pokus_users_dal.createUser(userFromReq.fullname, userFromReq.email, userFromReq.short_intro, userFromReq.is_female, userFromReq.birth_date);

    pokusResponseCode = 201; /// '201 Created' (and not just '200  OK')
    pokusResponseJSON = {
      message: `Pokus [POST /api/v1/users]: the user below described user was successfully added to the database : ${JSON.stringify(userFromReq, " ", 2)}`,
      user: userFromReq
    };
  } catch (e) {
    pokus_logger.error(`Pokus [POST /api/v1/users]: An error occured while trying to save the user below attached, to the pokus database `);
    pokus_logger.error(e);
    pokusResponseCode = 500;
    pokusResponseJSON = {
      message: `Pokus [POST /api/v1/users]: An error occured while trying to save the user below described, to the pokus database : ${JSON.stringify(userFromReq, " ", 2)} `,
      error: `${e.toString()}`,
      user: userFromReq
    };
  } finally {
    response.status(pokusResponseCode);
    response.json(pokusResponseJSON)
  }

};



// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // UPDATE HANDLER // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
const updateHandler = (request, response, next) => {
  // will make use of query path parameters and parameters to update the user by id

    let stringifiedBody = JSON.stringify(request.body, " ", 2);

    // 1./ display 'stringifiedBody' BEFORE any string operation
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/****** FINDME [PUT /api/v1/users] Router,    [1./ display 'stringifiedBody' BEFORE any string operation]  : `);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(stringifiedBody);

    // 2./ run operations on string
    let editedStringifiedBody = stringifiedBody
    // -> remove last character : a closing curly bracket
    editedStringifiedBody = editedStringifiedBody.slice(0, -1)
    // -> remove the 5 firsts characters : an opening curly bracket '    {'
    editedStringifiedBody = editedStringifiedBody.substring(5)
    // --> Okay, so removing first and last characters removed unwanted opening and closing brakcets: but e still have 6 remaining unwanted charaters, namely ': ""  ',at the end of the string, let's remove them :
    // -> remove the 4 last characters : a closing curly bracket
    editedStringifiedBody = editedStringifiedBody.slice(0, -1)
    editedStringifiedBody = editedStringifiedBody.slice(0, -1)
    editedStringifiedBody = editedStringifiedBody.slice(0, -1)
    editedStringifiedBody = editedStringifiedBody.slice(0, -1)
    editedStringifiedBody = editedStringifiedBody.slice(0, -1)
    editedStringifiedBody = editedStringifiedBody.slice(0, -1)

    // Remove all occurences of backslash :
    editedStringifiedBody = editedStringifiedBody.replace(/\\/g,'')

    // 3./ display 'stringifiedBody' AFTER operations
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/****** FINDME [PUT /api/v1/users] Router,    [3./ display 'stringifiedBody' AFTER any string operation]  : `);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/****** [stringifiedBody]  : `);
    pokus_logger.info(stringifiedBody);
    pokus_logger.info(`/****** [editedStringifiedBody]  : `);
    pokus_logger.info(editedStringifiedBody);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/************************************************************************* `);

    let parsedBody = JSON.parse(editedStringifiedBody);
    request.body = parsedBody;
    /// const createUser(p_email, p_email, p_short_intro, p_is_female, p_birth_date)
    /// userFromReq.email, userFromReq.email, userFromReq.short_intro, userFromReq.is_female, userFromReq.birth_date
    const userFromReq = {
      user_id: `${parsedBody.user_id}`,
      fullname: `${parsedBody.fullname}`,
      email: `${parsedBody.email}`,
      short_intro: `${parsedBody.short_intro}`,
      is_female: parsedBody.is_female,
      birth_date: parsedBody.birth_date || `01/01/1970`
    }

    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/******FINDME [PUT /api/v1/users] Router, The user received from the http request is: `);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`    User [request.body.user_id] : '${request.body.user_id}'`);
    pokus_logger.info(`    User [request.body.fullname] : '${request.body.fullname}'`);
    pokus_logger.info(`    User [request.body.email] : '${request.body.email}'`);
    pokus_logger.info(`    User [request.body.short_intro] : ${request.body.short_intro}`);
    pokus_logger.info(`    User [request.body.is_female] : "${request.body.is_female}"`);
    pokus_logger.info(`    User [request.body.birth_date] : "${request.body.birth_date}"`);
    pokus_logger.info(`    User [parsedBody.user_id] : '${parsedBody.user_id}'`);
    pokus_logger.info(`    User [parsedBody.fullname] : '${parsedBody.fullname}'`);
    pokus_logger.info(`    User [parsedBody.email] : '${parsedBody.email}'`);
    pokus_logger.info(`    User [parsedBody.short_intro] : ${parsedBody.short_intro}`);
    pokus_logger.info(`    User [parsedBody.is_female] : "${parsedBody.is_female}"`);
    pokus_logger.info(`    User [parsedBody.birth_date] : "${parsedBody.birth_date}"`);
    pokus_logger.info(`    User [request.body] : `);
    /// pokus_logger.info(request.body);
    pokus_logger.info(JSON.stringify(request.body, " ", 2));
    pokus_logger.info(`/************************************************************************* `);


    pokus_logger.info(` Pokus [PUT /api/v1/users]: the user to update in the database is : ${JSON.stringify(userFromReq, " ", 2)}  `);
    pokus_users_dal.updateUserById(response, userFromReq.user_id, userFromReq.fullname, userFromReq.email, userFromReq.short_intro, userFromReq.is_female, userFromReq.birth_date);

    ///

};


// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // RETRIEVE HANDLER // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
const retrieveHandler = (request, response, next) => {
  let requested_url_str = request.baseUrl + request.url;
  if (pokus_environment.getEnvironment().tls_enabled) {
   requested_url_str = `https://${request.headers.host}${request.url}` ;
  } else {
   requested_url_str = `http://${request.headers.host}${request.url}` ;
  }

  pokus_logger.info(`**********************************************************************`);
  pokus_logger.info(` Pokus [GET /api/v1/users]: Your users search request page : ${requested_url_str}`);
  pokus_logger.info(`**********************************************************************`);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [getUsers = ()] , inspect query params : `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    User [request.query] : `);
  pokus_logger.info(`${JSON.stringify(request.query, " ", 2)}`);
  pokus_logger.info(`/************************************************************************* `);


  let pokusResponseCode = 599;
  let pokusResponseJSON = {};
  let retrievedUsers = {};
  let searchCriterias = {};

  try {

      searchCriterias = {
        search_str: `${request.query.search}`, // search on fullname
        female: request.query.female || (`${request.query.female}` === 'true' ) || null, // sex filter
        email: `${request.query.email}` || "", // email search
        user_id: `${request.query.user_id}` // search by Id
      }

      // --- // --- // --- // --- // --- // --- // --- // --- // --- // --- // --- // --- // --- //
      // --- // --- //        if the user_id request parameter is
      //                      sent, we ignore {search_str} {female} {email}
      //
      let isNullOrUndefinedBool = isNullOrUndefined(searchCriterias.user_id)

      pokus_logger.info(`/************************************************************************* `);
      pokus_logger.info(`/****** TRACKER 1 - [getUsers = ()] , inspect [searchCriterias] params : `);
      pokus_logger.info(`/************************************************************************* `);
      pokus_logger.info(`    User [searchCriterias] : `);
      pokus_logger.info(`${JSON.stringify(searchCriterias, " ", 2)}`);
      pokus_logger.info(`/************************************************************************* `);
      pokus_logger.info(`    User isNullOrUndefinedBool=[${isNullOrUndefinedBool}] : `);
      pokus_logger.info(`/************************************************************************* `);

      try {
        const testParsingUserId = Number(`${request.query.user_id}`);
        pokus_logger.info(`/************************************************************************* `);
        pokus_logger.info(`/****** - Pokus [GET /api/v1/users] : `);
        pokus_logger.info(`/************************************************************************* `);
        pokus_logger.info(`    The [user_id] sent by http request could `);
        pokus_logger.info(`    successfully be parsed from string to integer using [const testParsingUserId = Number(\`\${request.query.user_id}\`)] : `);
        pokus_logger.info(`Ths gave the integer : ${testParsingUserId}`)
        pokus_logger.info(`/************************************************************************* `);
      } catch (e) {

        pokus_logger.error(`/************************************************************************* `);
        pokus_logger.error(`/****** - Pokus [GET /api/v1/users] : `);
        pokus_logger.error(`/************************************************************************* `);
        pokus_logger.error(`    The [user_id] sent by http request could `);
        pokus_logger.error(`    not be parsed from string to integer using [const testParsingUserId = Number(\`\${request.query.user_id}\`)] `);
        pokus_logger.error(e);
        pokus_logger.error(`/************************************************************************* `);


        errMsg = errMsg + `/****** - Pokus [GET /api/v1/users] : ${e}`;
        errMsg = errMsg + `    The [user_id] sent by http request could `;
        errMsg = errMsg + `    not be parsed from string to integer using [const testParsingUserId = Number(\`\${request.query.user_id}\`)]`;


        throw new Error(errMsg);

      } finally {


      }



      if (!isNullOrUndefinedBool) {
        pokus_users_dal.getUserById(searchCriterias.user_id, function (results) {
          pokus_logger.info(`**********************************************************************`);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(` Pokus [GET /api/v1/users]: [pokus_users_dal.getUsers] callback to retrieve a user from its Id :`);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(`here is the [docs] object received from mongoose : `);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(`${JSON.stringify(results, " ", 2)}`);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(`**********************************************************************`);
          pokusResponseCode = 200;
          pokusResponseJSON = {
            message: `Pokus [GET /api/v1/users]: [pokus_users_dal.getUsers] callback to retrieve a user from its Id :`,
            search: {
              user_id: searchCriterias.user_id
            },
            results: results
          };
          response.status(pokusResponseCode);
          response.json(pokusResponseJSON)
        });
        return;
      }


      let fullSearchBool = doIsearchAll(searchCriterias.search_str, searchCriterias.female, searchCriterias.email);

      pokus_logger.info(` Pokus [GET /api/v1/users]: [fullSearchBool] = [${fullSearchBool}]  `);

      if (!fullSearchBool) {  // if at least one of the criteria is null or undefined

        ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// /////
        ///// search_str: `${request.query.search}`, // search on fullname
        ///// female: request.query.female || true, // sex filter
        ///// email: `${request.query.email}` || "", // email search
        ///// user_id: `${request.query.user_id}` // search by Id
        pokus_users_dal.getUsers(searchCriterias.search_str, searchCriterias.female, searchCriterias.email, function (docs) {
          pokus_logger.info(`**********************************************************************`);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(` Pokus [GET /api/v1/users]: [pokus_users_dal.getUsers] callback to retrieve users async from mongoose :`);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(`here is the [docs] object received from mongoose : `);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(`${JSON.stringify(docs, " ", 2)}`);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(`**********************************************************************`);
          pokusResponseCode = 200;
          pokusResponseJSON = {
            message: ` ok ça vient bien du callback `,
            error: `nonya pas derreur c un test error`,
            search: {},
            results: docs
          };
          response.status(pokusResponseCode);
          response.json(pokusResponseJSON)
        });
      } else {
        pokus_users_dal.getAllUsers(function (docs) {
          pokus_logger.info(`**********************************************************************`);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(` Pokus [GET /api/v1/users][getAllUsers()]: [pokus_users_dal.getUsers] callback to retrieve users async from mongoose :`);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(`here is the [docs] object received from mongoose : `);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(`${JSON.stringify(docs, " ", 2)}`);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(`**********************************************************************`);
          pokusResponseCode = 200;
          pokusResponseJSON = {
            message: ` ok ça vient bien du callback getAllUsers pour le endpoint [GET /api/v1/users] / les 20 premiers résultats `,
            results: docs
          };
          response.status(pokusResponseCode);
          response.json(pokusResponseJSON)
        });
      }
      /*
      pokus_logger.info(`**********************************************************************`);
      pokus_logger.info(` Pokus [GET /api/v1/users]: Pokus retrieved users from your search request : ${JSON.stringify(retrievedUsers, " ", 2)}`);
      pokus_logger.info(`**********************************************************************`);
      pokusResponseCode = 200; // '201' leans created, and i want 200 OK
      pokusResponseJSON = {
        search: searchCriterias,
        users: retrievedUsers
      };
      */
  } catch (e) {
      pokus_logger.info(`**********************************************************************`);
      pokus_logger.info(` Pokus [GET /api/v1/users]: An error occured while trying to retrieve users with your search request : ${JSON.stringify(searchCriterias, " ", 2)}`);
      pokus_logger.info(`**********************************************************************`);
      pokus_logger.info(e);
      pokusResponseCode = 500;
      pokusResponseJSON = {
        message: ` Pokus [GET /api/v1/users]: An error occured while trying to retrieve users with your search request : ${JSON.stringify(searchCriterias, " ", 2)} `,
        error: `database error`,
        search: searchCriterias
      };
  } finally {
      /*
      response.status(pokusResponseCode);
      response.json(pokusResponseJSON);
      */
  }

};



/**
 * will also consider undefined a string which calue is the string 'undefined'
 **/
const isNullOrUndefined = (myvariable) => {
  if (myvariable === undefined || myvariable == "undefined" || myvariable === null ) {
    //
    pokus_logger.info(`    User myvariable=[${myvariable}] : is neither null nor undefined`);
    return true;
  } else {
    //
    pokus_logger.info(`    User myvariable=[${myvariable}] : is either null or undefined`);
    return false;
  }

}
// -+-
// -+- returns a bollean : if true, then we will execute find() to get all users
// -+-
const doIsearchAll = (p_search_str, p_female, p_email) => {
  let doIsearchAll = false;
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [getUsers = ()] , searching for users with those criterias: `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    User [p_search_str] : '${p_search_str}'`);
  pokus_logger.info(`    User [p_female] : ${p_female}`);
  pokus_logger.info(`    User [p_email] : "${p_email}"`);
  pokus_logger.info(`/** `);

  let p_emailSkip = false;
  let p_femaleSkip = false;
  let p_search_strSkip = false;


  if (p_female === null ) {
    //
    pokus_logger.info(` [1]   User [p_female] : IS null`);
  } else {
    //
    pokus_logger.info(` [2]   User [p_female] : IS NOT null`);
  }

  if (p_female === undefined || p_female == "undefined" ) {
    //
    pokus_logger.info(` [3]   User [p_female] : IS undefined`);
  } else {
    //
    pokus_logger.info(` [4]   User [p_female] : is NOT undefined`);
  }

  if (p_female === undefined || p_female == "undefined" || p_female === null ) {
    //
    pokus_logger.info(` [5]   User [p_female] : is null or undefined`);
    p_femaleSkip = true;
  } else {
    //
    pokus_logger.info(` [6]   User [p_female] : is NEITHER null NOR undefined`);
  }

  pokus_logger.info(`/** `);


  if (p_email === null ) {
    //
    pokus_logger.info(`    User [p_email] : IS null`);
  } else {
    //
    pokus_logger.info(`    User [p_email] : IS NOT null`);
  }

  if ( (typeof p_email == 'undefined') || p_email == "undefined" ) {
    //
    pokus_logger.info(`    User [p_email] : IS undefined`);
  } else {
    //
    pokus_logger.info(`    User [p_email] : is NOT undefined`);
  }

  if ( (typeof p_email == 'undefined') || p_email == "undefined" || p_email === null ) {
    //
    pokus_logger.info(`    User [p_email] : is null or undefined`);
    p_emailSkip = true;

  } else {
    //
    pokus_logger.info(`    User [p_email] : is NEITHER null NOR undefined`);
  }
  pokus_logger.info(`TypeOf p_email is : [${typeof p_email}]`)

  // --- p_search_str

  if (p_search_str === null ) {
    //
    pokus_logger.info(`    User [p_search_str] : IS null`);
  } else {
    //
    pokus_logger.info(`    User [p_search_str] : IS NOT null`);
  }

  if (p_search_str === undefined || p_search_str == "undefined" ) {
    //
    pokus_logger.info(`    User [p_search_str] : IS undefined`);
  } else {
    //
    pokus_logger.info(`    User [p_search_str] : is NOT undefined`);
  }

  if (p_search_str === undefined || p_search_str == "undefined" || p_search_str === null ) {
    //
    pokus_logger.info(`    User [p_search_str] : is null or undefined`);
    p_search_strSkip = true;
  } else {
    //
    pokus_logger.info(`    User [p_search_str] : is NEITHER null NOR undefined`);
  }

  pokus_logger.info(`/** `);


  pokus_logger.info(`/************************************************************************* `);

  // UserModel.find();

  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [getUsers = ()] , before launching MongoDB search: `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    User search [p_femaleSkip] : '${p_femaleSkip}'`);
  pokus_logger.info(`    User search [p_emailSkip] : ${p_emailSkip}`);
  pokus_logger.info(`    User search [p_search_strSkip] : ${p_search_strSkip}`);
  pokus_logger.info(`/** **********************************************`);

  doIsearchAll = p_femaleSkip && p_emailSkip && p_search_strSkip;
  return doIsearchAll;
}


module.exports = {
    updateHandler: updateHandler,
    retrieveHandler: retrieveHandler,
    deleteHandler: deleteHandler,
    createHandler: createHandler
}
