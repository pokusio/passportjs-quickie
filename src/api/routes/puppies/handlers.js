// getting-started.js
const mongoose = require('mongoose');
const winston = require('winston');

const users_mongoose_schemas = require("./../../../dal/models/puppies/puppy.schema")
const pokus_connections = require("./../../../dal/connection/pool/")

const pokus_environment = require("./../../../environment/")
const pokus_puppies_dal = require("./../../../dal/")

/*   const pokus_logger = pokus_logging.getLogger();  */
const pokus_logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});


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



// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // DELETE HANDLER // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
const deleteHandler = (request, response, next) => {

    // 1./ display 'retrieved query params' BEFORE any string operation
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/****** FINDME [DELETE /api/v1/puppies] Router,    : [${request.query.puppy_id}] `);
    pokus_logger.info(`/************************************************************************* `);

    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`/******FINDME [DELETE /api/v1/puppies] Router, The puppy received from the http request is: `);
    pokus_logger.info(`/************************************************************************* `);
    pokus_logger.info(`    Puppy [request.query.puppy_id] : '${request.query.puppy_id}'`);
    pokus_logger.info(`/************************************************************************* `);



    pokus_logger.info(` Pokus [DELETE /api/v1/puppies]: the puppy to delete in the database `);
    pokus_puppies_dal.deletePuppyById(response, request.query.puppy_id);

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
    // pokus_puppies_dal.createPuppy(testPuppy.cute_name, testPuppy.is_female, testPuppy.description);
    pokus_puppies_dal.createPuppy(puppyFromReq.cute_name, puppyFromReq.is_female, puppyFromReq.description, puppyFromReq.color);
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

};


// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // UPDATE HANDLER // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
// -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- // -*- //
const updateHandler = (request, response, next) => {
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
    pokus_puppies_dal.updatePuppyById(response, puppyFromReq.puppy_id, puppyFromReq.cute_name, puppyFromReq.is_female, puppyFromReq.description, puppyFromReq.color);


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
        female: request.query.female || (`${request.query.female}` === 'true' ) || null, // sex filter
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
        pokus_puppies_dal.getPuppyById(searchCriterias.puppy_id, function (results) {
          pokus_logger.info(`**********************************************************************`);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(` Pokus [GET /api/v1/puppies]: [pokus_puppies_dal.getPuppies] callback to retrieve a puppy from its Id :`);
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
            message: `Pokus [GET /api/v1/puppies]: [pokus_puppies_dal.getPuppies] callback to retrieve a puppy from its Id :`,
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
        pokus_puppies_dal.getPuppies(searchCriterias.search_str, searchCriterias.female, searchCriterias.color, function (docs) {
          pokus_logger.info(`**********************************************************************`);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(` Pokus [GET /api/v1/puppies]: [pokus_puppies_dal.getPuppies] callback to retrieve puppies async from mongoose :`);
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
        pokus_puppies_dal.getAllPuppies(function (docs) {
          pokus_logger.info(`**********************************************************************`);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(` Pokus [GET /api/v1/puppies][getAllPuppies()]: [pokus_puppies_dal.getPuppies] callback to retrieve puppies async from mongoose :`);
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

};



/**
 * will also consider undefined a string which calue is the string 'undefined'
 **/
const isNullOrUndefined = (myvariable) => {
  if (myvariable === undefined || myvariable == "undefined" || myvariable === null ) {
    //
    pokus_logger.info(`    Puppy myvariable=[${myvariable}] : is neither null nor undefined`);
    return true;
  } else {
    //
    pokus_logger.info(`    Puppy myvariable=[${myvariable}] : is either null or undefined`);
    return false;
  }

}
// -+-
// -+- returns a bollean : if true, then we will execute find() to get all puppies
// -+-
const doIsearchAll = (p_search_str, p_female, p_color) => {
  let doIsearchAll = false;
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [getPuppies = ()] , searching for puppies with those criterias: `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    Puppy [p_search_str] : '${p_search_str}'`);
  pokus_logger.info(`    Puppy [p_female] : ${p_female}`);
  pokus_logger.info(`    Puppy [p_color] : "${p_color}"`);
  pokus_logger.info(`/** `);

  let p_colorSkip = false;
  let p_femaleSkip = false;
  let p_search_strSkip = false;


  if (p_female === null ) {
    //
    pokus_logger.info(` [1]   Puppy [p_female] : IS null`);
  } else {
    //
    pokus_logger.info(` [2]   Puppy [p_female] : IS NOT null`);
  }

  if (p_female === undefined || p_female == "undefined" ) {
    //
    pokus_logger.info(` [3]   Puppy [p_female] : IS undefined`);
  } else {
    //
    pokus_logger.info(` [4]   Puppy [p_female] : is NOT undefined`);
  }

  if (p_female === undefined || p_female == "undefined" || p_female === null ) {
    //
    pokus_logger.info(` [5]   Puppy [p_female] : is null or undefined`);
    p_femaleSkip = true;
  } else {
    //
    pokus_logger.info(` [6]   Puppy [p_female] : is NEITHER null NOR undefined`);
  }

  pokus_logger.info(`/** `);


  if (p_color === null ) {
    //
    pokus_logger.info(`    Puppy [p_color] : IS null`);
  } else {
    //
    pokus_logger.info(`    Puppy [p_color] : IS NOT null`);
  }

  if ( (typeof p_color == 'undefined') || p_color == "undefined" ) {
    //
    pokus_logger.info(`    Puppy [p_color] : IS undefined`);
  } else {
    //
    pokus_logger.info(`    Puppy [p_color] : is NOT undefined`);
  }

  if ( (typeof p_color == 'undefined') || p_color == "undefined" || p_color === null ) {
    //
    pokus_logger.info(`    Puppy [p_color] : is null or undefined`);
    p_colorSkip = true;

  } else {
    //
    pokus_logger.info(`    Puppy [p_color] : is NEITHER null NOR undefined`);
  }
  pokus_logger.info(`TypeOf p_color is : [${typeof p_color}]`)

  // --- p_search_str

  if (p_search_str === null ) {
    //
    pokus_logger.info(`    Puppy [p_search_str] : IS null`);
  } else {
    //
    pokus_logger.info(`    Puppy [p_search_str] : IS NOT null`);
  }

  if (p_search_str === undefined || p_search_str == "undefined" ) {
    //
    pokus_logger.info(`    Puppy [p_search_str] : IS undefined`);
  } else {
    //
    pokus_logger.info(`    Puppy [p_search_str] : is NOT undefined`);
  }

  if (p_search_str === undefined || p_search_str == "undefined" || p_search_str === null ) {
    //
    pokus_logger.info(`    Puppy [p_search_str] : is null or undefined`);
    p_search_strSkip = true;
  } else {
    //
    pokus_logger.info(`    Puppy [p_search_str] : is NEITHER null NOR undefined`);
  }

  pokus_logger.info(`/** `);


  pokus_logger.info(`/************************************************************************* `);

  // PuppyModel.find();

  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`/****** [getPuppies = ()] , before launching MongoDB search: `);
  pokus_logger.info(`/************************************************************************* `);
  pokus_logger.info(`    Puppy search [p_femaleSkip] : '${p_femaleSkip}'`);
  pokus_logger.info(`    Puppy search [p_colorSkip] : ${p_colorSkip}`);
  pokus_logger.info(`    Puppy search [p_search_strSkip] : ${p_search_strSkip}`);
  pokus_logger.info(`/** **********************************************`);

  doIsearchAll = p_femaleSkip && p_colorSkip && p_search_strSkip;
  return doIsearchAll;
}


module.exports = {
    updateHandler: updateHandler,
    retrieveHandler: retrieveHandler,
    deleteHandler: deleteHandler,
    createHandler: createHandler
}
