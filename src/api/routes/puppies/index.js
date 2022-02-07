// // -- // -- // -- // -- // -- // -- // --
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
// // -- // -- // -- // -- // -- // -- // --
const express = require('express');
const winston = require('winston');
const router = express.Router();
const handlers = require('./handlers');

// // -- // -- // -- // -- // -- // -- // --
// const mongoose = require('mongoose');
// // -- // -- // -- // -- // -- // -- // --


// // -- // -- // -- // app.put-- // -- // -- // --
// const users_mongoose_schemas = require("./../../models/user/user.schema")
// const pokus_connections = require("./../../connection/pool/")
// // -- // -- // -- // -- // -- // -- // --


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



/************************************************************************************
*   [(CRUD CREATE PUPPIES)]
**********************************************************************
*   POST /api/v1/puppies Router / (protected):
* ---> list all virtual machines
*
*    +--> $ curl -iv http://127.0.0.1:9099/api/v1/puppies
*    +--> $ curl -iv http://127.0.0.1:9099/api/v1/puppies -d '{ "cute_name": "jerry", "description": "hes a cat actually", "is_female": false}' -X POST -H "Accept: application/json"
*
*
**************/
app.post('/api/v1/puppies', (request, response) => {


  let stringifiedBody = JSON.stringify(request.body, " ", 2);

  // 1./ display 'stringifiedBody' BEFORE any string operation
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** FINDME [POST /api/v1/puppies] Router,    [1./ display 'stringifiedBody' BEFORE any string operation]  : `);
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
  pokus_logger.info(`/****** FINDME [POST /api/v1/puppies] Router,    [3./ display 'stringifiedBody' AFTER any string operation]  : `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [stringifiedBody]  : `);
  pokus_logger.info(stringifiedBody);
  pokus_logger.info(`/****** [editedStringifiedBody]  : `);
  pokus_logger.info(editedStringifiedBody);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/************************************************************************* `);







  let parsedBody = JSON.parse(editedStringifiedBody);
  request.body = parsedBody;

  const puppyFromReq = {
    cute_name: `${parsedBody.cute_name}`,
    is_female: parsedBody.is_female,
    description: `${parsedBody.description}`,
    color: `${request.body.color}`
  }

  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/******FINDME [POST /api/v1/puppies] Router, The puppy received from the http request is: `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    Puppy [request.body.cute_name] : '${request.body.cute_name}'`);
  pokus_logger.info(`    Puppy [request.body.is_female] : ${request.body.is_female}`);
  pokus_logger.info(`    Puppy [request.body.description] : "${request.body.description}"`);
  pokus_logger.info(`    Puppy [request.body.color] : "${request.body.color}"`);
  pokus_logger.info(`    Puppy [parsedBody.cute_name] : '${parsedBody.cute_name}'`);
  pokus_logger.info(`    Puppy [parsedBody.is_female] : ${parsedBody.is_female}`);
  pokus_logger.info(`    Puppy [parsedBody.description] : "${parsedBody.description}"`);
  pokus_logger.info(`    Puppy [request.body.color] : "${request.body.color}"`);
  pokus_logger.info(`    Puppy [request.body] : `);
  /// pokus_logger.info(request.body);
  pokus_logger.info(JSON.stringify(request.body, " ", 2));
  pokus_logger.info(`/************************************************************************* `);


  let requested_url_str = request.url;

  pokus_logger.info(` Pokus [POST /api/v1/puppies]: the puppy to add to the database is : ${JSON.stringify(puppyFromReq, " ", 2)} rendering 404 page for requested page : ${requested_url_str}`);

  let pokusResponseCode = 599;
  let pokusResponseJSON = {};
  try {
    // pokus_dal.createPuppy(testPuppy.cute_name, testPuppy.is_female, testPuppy.description);
    pokus_dal.createPuppy(puppyFromReq.cute_name, puppyFromReq.is_female, puppyFromReq.description, puppyFromReq.color);
    pokus_logger.info(` `);

    pokusResponseCode = 201; /// '201 Created' (and not just '200  OK')
    pokusResponseJSON = {
      message: `Pokus [POST /api/v1/puppies]: the puppy below described puppy was successfully added to the database : ${JSON.stringify(puppyFromReq, " ", 2)}`,
      puppy: puppyFromReq
    };
  } catch (e) {
    pokus_logger.info(`Pokus [POST /api/v1/puppies]: An error occured while trying to save the puppy below attached, to the pokus database `);

    pokusResponseCode = 500;
    pokusResponseJSON = {
      message: `Pokus [POST /api/v1/puppies]: An error occured while trying to save the puppy below described, to the pokus database : ${JSON.stringify(puppyFromReq, " ", 2)} `,
      error: `database error`,
      puppy: puppyFromReq
    };
  } finally {
    response.status(pokusResponseCode);
    response.json(pokusResponseJSON)
  }

})

/**********************************************************************
 *   GET /api/v1/puppies Router / (protected)
 **********************************************************************
 *   [(CRUD DELETE PUPPIES)]
 **********************************************************************
 *    +--> Since this is the last non-error-handling
 *
 *    ?puppy_id=<value of your puppy's ID>
 *
 *    +--> $ curl -X DELETE -iv http://127.0.0.1:9099/api/v1/puppies?puppy_id=<value of your puppy's ID>
 *
 * to delete puppies
 ****************/
/// pokus_puppies_route.deleteHandler(request, response, next)
// app.delete('/api/v1/puppies', pokus_puppies_route.deleteHandler);





/**********************************************************************
 *   PUT /api/v1/puppies Router / (protected)
 **********************************************************************
 *   [(CRUD UPDATE PUPPIES)]
 **********************************************************************
 *    +--> Since this is the last non-error-handling
 *
 *    ?search=cha
 *    ?search=cha&female=false
 *    ?search=cha&female=false&color=yellow
 *    +--> $ curl -X PUT -iv http://127.0.0.1:9099/api/v1/puppies
 *    +--> $ curl -X PUT -iv http://127.0.0.1:9099/api/v1/puppies -H "Accept: application/json"
 *    +--> $ curl -X PUT -iv http://127.0.0.1:9099/api/v1/puppies -H "Accept: text/plain"
 *
 * to update puppies
 ****************/
app.put('/api/v1/puppies', (request, response, next) => {
  // will make use of query path parameters and parameters to update the puppy by id

    let stringifiedBody = JSON.stringify(request.body, " ", 2);

    // 1./ display 'stringifiedBody' BEFORE any string operation
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/****** FINDME [PUT /api/v1/puppies] Router,    [1./ display 'stringifiedBody' BEFORE any string operation]  : `);
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
    pokus_logger.info(`/****** FINDME [PUT /api/v1/puppies] Router,    [3./ display 'stringifiedBody' AFTER any string operation]  : `);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/****** [stringifiedBody]  : `);
    pokus_logger.info(stringifiedBody);
    pokus_logger.info(`/****** [editedStringifiedBody]  : `);
    pokus_logger.info(editedStringifiedBody);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/************************************************************************* `);

    let parsedBody = JSON.parse(editedStringifiedBody);
    request.body = parsedBody;

    const puppyFromReq = {
      puppy_id: `${parsedBody.puppy_id}`,
      cute_name: `${parsedBody.cute_name}`,
      is_female: parsedBody.is_female,
      description: `${parsedBody.description}`,
      color: `${request.body.color}`
    }

    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/******FINDME [PUT /api/v1/puppies] Router, The puppy received from the http request is: `);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`    Puppy [request.body.puppy_id] : '${request.body.puppy_id}'`);
    pokus_logger.info(`    Puppy [request.body.cute_name] : '${request.body.cute_name}'`);
    pokus_logger.info(`    Puppy [request.body.is_female] : ${request.body.is_female}`);
    pokus_logger.info(`    Puppy [request.body.description] : "${request.body.description}"`);
    pokus_logger.info(`    Puppy [request.body.color] : "${request.body.color}"`);
    pokus_logger.info(`    Puppy [parsedBody.puppy_id] : '${parsedBody.puppy_id}'`);
    pokus_logger.info(`    Puppy [parsedBody.cute_name] : '${parsedBody.cute_name}'`);
    pokus_logger.info(`    Puppy [parsedBody.is_female] : ${parsedBody.is_female}`);
    pokus_logger.info(`    Puppy [parsedBody.description] : "${parsedBody.description}"`);
    pokus_logger.info(`    Puppy [request.body.color] : "${request.body.color}"`);
    pokus_logger.info(`    Puppy [request.body] : `);
    /// pokus_logger.info(request.body);
    pokus_logger.info(JSON.stringify(request.body, " ", 2));
    pokus_logger.info(`/************************************************************************* `);


    let requested_url_str = request.url;

    pokus_logger.info(` Pokus [PUT /api/v1/puppies]: the puppy to update in the database is : ${JSON.stringify(puppyFromReq, " ", 2)} / requested page : ${requested_url_str}`);
    pokus_dal.updatePuppyById(response, puppyFromReq.puppy_id, puppyFromReq.cute_name, puppyFromReq.is_female, puppyFromReq.description, puppyFromReq.color);


});
 /**********************************************************************
  *   GET /api/v1/puppies Router / (protected) ()
  **********************************************************************
  *   [(CRUD RETRIEVE PUPPIES)]
  **********************************************************************
  *    +--> Since this is the last non-error-handling
  *
  *    ?search=cha
  *    ?search=cha&female=false
  *    ?search=cha&female=false&color=yellow
  *    +--> $ curl -iv http://127.0.0.1:9099/api/v1/puppies
  *    +--> $ curl -iv http://127.0.0.1:9099/api/v1/puppies -H "Accept: application/json"
  *    +--> $ curl -iv http://127.0.0.1:9099/api/v1/puppies -H "Accept: text/plain"
  *
  * to search / browse puppies
  ****************/
app.get('/api/v1/puppies', (request, response, next) => {
  let requested_url_str = request.baseUrl + request.url;
  if (pokus_environment.getEnvironment().tsl_enabled) {
   requested_url_str = `https://${request.headers.host}${request.url}` ;
  } else {
   requested_url_str = `http://${request.headers.host}${request.url}` ;
  }

  pokus_logger.info(`**********************************************************************`);
  pokus_logger.info(` Pokus [GET /api/v1/puppies]: Your puppies search request page : ${requested_url_str}`);
  pokus_logger.info(`**********************************************************************`);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [getPuppies = ()] , inspect query params : `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    Puppy [request.query] : `);
  pokus_logger.info(`${JSON.stringify(request.query, " ", 2)}`);
  pokus_logger.info(`/************************************************************************* `);


  let pokusResponseCode = 599;
  let pokusResponseJSON = {};
  let retrievedPuppies = {};
  let searchCriterias = {};

  try {

      searchCriterias = {
        search_str: `${request.query.search}`,
        female: request.query.female || true,
        color: `${request.query.color}` || "",
        puppy_id: `${request.query.puppy_id}`
      }

      try {
        const testParsingPuppyId = Number(`${request.query.puppy_id}`);
        pokus_logger.info(`/************************************************************************* `);
        pokus_logger.info(`/****** - Pokus [GET /api/v1/puppies] : `);
        pokus_logger.info(`/************************************************************************* `);
        pokus_logger.info(`    The [puppy_id] sent by http request could `);
        pokus_logger.info(`    successfully be parsed from string to integer using [const testParsingPuppyId = Number(\`\${request.query.puppy_id}\`)] : `);
        pokus_logger.info(`Ths gave the integer : ${testParsingPuppyId}`)
        pokus_logger.info(`/************************************************************************* `);
        searchCriterias.puppy_id
      } catch (e) {

        pokus_logger.error(`/************************************************************************* `);
        pokus_logger.error(`/****** - Pokus [GET /api/v1/puppies] : `);
        pokus_logger.error(`/************************************************************************* `);
        pokus_logger.error(`    The [puppy_id] sent by http request could `);
        pokus_logger.error(`    not be parsed from string to integer using [const testParsingPuppyId = Number(\`\${request.query.puppy_id}\`)] `);
        pokus_logger.error(e);
        pokus_logger.error(`/************************************************************************* `);


        errMsg = errMsg + `/****** - Pokus [GET /api/v1/puppies] : ${e}`;
        errMsg = errMsg + `    The [puppy_id] sent by http request could `;
        errMsg = errMsg + `    not be parsed from string to integer using [const testParsingPuppyId = Number(\`\${request.query.puppy_id}\`)]`;


        throw new Error(errMsg);

      } finally {


      }
      // --- // --- // --- // --- // --- // --- // --- // --- // --- // --- // --- // --- // --- //
      // --- // --- //        if the puppy_id request parameter is
      //                      sent, we ignore {search_str} {female} {color}
      //
      let isNullOrUndefinedBool = isNullOrUndefined(searchCriterias.puppy_id)

      pokus_logger.info(`/************************************************************************* `);
      pokus_logger.info(`/****** TRACKER 1 - [getPuppies = ()] , inspect [searchCriterias] params : `);
      pokus_logger.info(`/************************************************************************* `);
      pokus_logger.info(`    Puppy [searchCriterias] : `);
      pokus_logger.info(`${JSON.stringify(searchCriterias, " ", 2)}`);
      pokus_logger.info(`/************************************************************************* `);
      pokus_logger.info(`    Puppy isNullOrUndefinedBool=[${isNullOrUndefinedBool}] : `);
      pokus_logger.info(`/************************************************************************* `);





            try {
              const testParsingPuppyId = Number(`${request.query.puppy_id}`);
              pokus_logger.info(`/************************************************************************* `);
              pokus_logger.info(`/****** - Pokus [GET /api/v1/puppies] : `);
              pokus_logger.info(`/************************************************************************* `);
              pokus_logger.info(`    The [puppy_id] sent by http request could `);
              pokus_logger.info(`    successfully be parsed from string to integer using [const testParsingPuppyId = Number(\`\${request.query.puppy_id}\`)] : `);
              pokus_logger.info(`Ths gave the integer : ${testParsingPuppyId}`)
              pokus_logger.info(`/************************************************************************* `);
              searchCriterias.puppy_id
            } catch (e) {

              pokus_logger.error(`/************************************************************************* `);
              pokus_logger.error(`/****** - Pokus [GET /api/v1/puppies] : `);
              pokus_logger.error(`/************************************************************************* `);
              pokus_logger.error(`    The [puppy_id] sent by http request could `);
              pokus_logger.error(`    not be parsed from string to integer using [const testParsingPuppyId = Number(\`\${request.query.puppy_id}\`)] `);
              pokus_logger.error(e);
              pokus_logger.error(`/************************************************************************* `);


              errMsg = errMsg + `/****** - Pokus [GET /api/v1/puppies] : ${e}`;
              errMsg = errMsg + `    The [puppy_id] sent by http request could `;
              errMsg = errMsg + `    not be parsed from string to integer using [const testParsingPuppyId = Number(\`\${request.query.puppy_id}\`)]`;


              throw new Error(errMsg);

            } finally {


            }



      if (!isNullOrUndefinedBool) {
        pokus_dal.getPuppyById(searchCriterias.puppy_id, function (results) {
          pokus_logger.info(`**********************************************************************`);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(` Pokus [GET /api/v1/puppies]: [pokus_dal.getPuppies] callback to retrieve a puppy from its Id :`);
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
            message: `Pokus [GET /api/v1/puppies]: [pokus_dal.getPuppies] callback to retrieve a puppy from its Id :`,
            search: {
              puppy_id: searchCriterias.puppy_id
            },
            results: results
          };
          response.status(pokusResponseCode);
          response.json(pokusResponseJSON)
        });
        return;
      }


      let fullSearchBool = doIsearchAll(searchCriterias.search_str, searchCriterias.female, searchCriterias.color);

      pokus_logger.info(` Pokus [GET /api/v1/puppies]: [fullSearchBool] = [${fullSearchBool}]  `);

      if (!fullSearchBool) {
        pokus_dal.getPuppies(searchCriterias.search_str, searchCriterias.female, searchCriterias.color, function (docs) {
          pokus_logger.info(`**********************************************************************`);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(` Pokus [GET /api/v1/puppies]: [pokus_dal.getPuppies] callback to retrieve puppies async from mongoose :`);
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
        pokus_dal.getAllPuppies(function (docs) {
          pokus_logger.info(`**********************************************************************`);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(` Pokus [GET /api/v1/puppies][getAllPuppies()]: [pokus_dal.getPuppies] callback to retrieve puppies async from mongoose :`);
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
      }
      /*
      pokus_logger.info(`**********************************************************************`);
      pokus_logger.info(` Pokus [GET /api/v1/puppies]: Pokus retrieved puppies from your search request : ${JSON.stringify(retrievedPuppies, " ", 2)}`);
      pokus_logger.info(`**********************************************************************`);
      pokusResponseCode = 200; // '201' leans created, and i want 200 OK
      pokusResponseJSON = {
        search: searchCriterias,
        puppies: retrievedPuppies
      };
      */
  } catch (e) {
      pokus_logger.info(`**********************************************************************`);
      pokus_logger.info(` Pokus [GET /api/v1/puppies]: An error occured while trying to retrieve puppies with your search request : ${JSON.stringify(searchCriterias, " ", 2)}`);
      pokus_logger.info(`**********************************************************************`);
      pokus_logger.info(e);
      pokusResponseCode = 500;
      pokusResponseJSON = {
        message: ` Pokus [GET /api/v1/puppies]: An error occured while trying to retrieve puppies with your search request : ${JSON.stringify(searchCriterias, " ", 2)} `,
        error: `database error`,
        search: searchCriterias
      };
  } finally {
      /*
      response.status(pokusResponseCode);
      response.json(pokusResponseJSON);
      */
  }

})
