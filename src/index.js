const express = require("express")
const winston = require('winston');

const path = require('path');
const ejs = require('ejs');

const hugo = require("./middlewares/hugo")
const pokus_environment = require("./environment/")
const pokus_logging = require("./logger/")
const pokus_dal = require("./dal/")


/*** REQUIRES FOR API ENDPOINTS ROUTERS
 *
 **/

 const puppiesPuppiesApiEndpoint = require("./api/routers/puppies/")
 const virtualboxMachinesApiEndpoint = require("./api/routers/virtualbox/machines/")
 const virtualboxDisksApiEndpoint = require("./api/routers/virtualbox/disks/")
 const virtualboxSnapshotsApiEndpoint = require("./api/routers/virtualbox/snapshots/")


/*   const pokus_logger = pokus_logging.getLogger();  */
const pokus_logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});

pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`/****** APP ROOT Initializing Winston logs : `);
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`    [process.env.LOG_LEVEL] : ${process.env.LOG_LEVEL}`);
pokus_logger.error(`Winston Init Tests:  error message`);
pokus_logger.warn(`Winston Init Tests:  warn message`);
pokus_logger.info(`Winston Init Tests:  info message`);
pokus_logger.verbose(`Winston Init Tests:  verbose message`);
pokus_logger.debug(`Winston Init Tests:  debug message`);
pokus_logger.silly(`Winston Init Tests:  silly message`);
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`/************************************************************************* `);




const app = express();

// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/************************************************************************************
 *    VIEWS TEMPLATE ENGINE : EJS
 **************/

// general ejs config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// our custom "verbose errors" setting
// which we can use in the templates
// via settings['verbose errors']
app.enable('verbose errors');


/************************************************************************************
 *   GET /static Router / (un-protected) (static folder served, for static pages like login 404 etc...)
 **************/
app.use(express.static(`${__dirname}/static`))




/************************************************************************************
 *   GET / Router / (un-protected)
 **************/
app.get('/', (request, response) => {
  response.status(302);
  response.send('Hello Pokus !')
})

/************************************************************************************
 *   GET /api/v1 Router / (un-protected) :
 * ---> gives a beautiful hugo geenrated OpenAPI Doc, with all the api documentation, served at /api/v1
 * ---> the hugo generated project for the doc contains and versions in the data folder, the [openapi.json] file
 *
 *    +--> $ curl -iv http://127.0.0.1:9099/api/v1 -H "Accept: text/html"
 *    +--> $ curl -iv http://127.0.0.1:9099/api/v1 -H "Accept: application/json" | tail -n 1 | jq .
 *    +--> $ curl -iv http://127.0.0.1:9099/api/v1 -H "Accept: text/plain"
 **************/
app.get('/api/v1/', (request, response) => {
  // response.send(`Hello Pokus !`)
  /* response.redirect(`https://static.pok-us.io`) */


  // respond with rediretion to API docs if required content type is HTML
  if (request.accepts('html')) {
     response.status(302);
   response.redirect(`https://api-docs.pok-us.io`);
   return;
  }

  // respond with API version and openapi.json to API docs if required content type is HTML
  // respond with json
  if (request.accepts('json')) {
   response.status(201);
   response.send({ api_version: '1.0.0-rc1' });
   return;
  }

  // defaults to API docs redirection
  response.status(302);
  response.redirect(`https://api-docs.pok-us.io`);

})
/************************************************************************************
 *   GET /api/ Router / (un-protected) :
 * ---> returns a beautiful 404
 * ---> that 404 is a hugo project
 **************/

/*
app.get('/api', (request, response) => {
   response.status(404);
   response.sendFile(`${__dirname}/static/404/v1/raw/index.html`)
})

*/

/************************************************************************************
 *   GET /api/v1/liveness Router :
 * ---> ping the API, for liveness (Are you alive ?)
 **************/
app.get('/api/v1/liveness', (request, response) => {
  /// response.send(`Pokus answers : Oh yes I al alive, very much alive !`)
  response.json({
    message: `Pokus answers : Oh yes I am alive, very much alive !`,
    whoami: `pokus`
  })
})


/************************************************************************************
 *   GET /api/v1/login Router / (un-protected) :
 * ---> trigger the Oauth2 Authentication flow
 **************/
 app.get('/api/v1/login', (request, response) => {
   /// response.send(`Pokus answers : Oh yes I al alive, very much alive !`)
   response.json({
     message: `Pokus answers : Oh yes I al alive, very much alive !`,
     whoami: `pokus`
   })
 })


/************************************************************************************
 *   GET /api/v1/machines Router / (protected):
 * ---> list all virtual machines
 **************/
 app.get('/api/v1/machines', (request, response) => {
 /// response.send(`Pokus answers : Oh yes I al alive, very much alive !`)
 response.json({
   message: `Pokus answers : Oh yes I am alive, very much alive !`,
   whoami: `pokus`
 })
})




/************************************************************************************
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
  const puppyFromReqZero = {
    cute_name: `${request.body.cute_name}`,
    is_female: request.body.is_female,
    description: `${request.body.description}`,
    color: `${request.body.color}`
  }
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

  const testPuppy = {
    cute_name: `tootsie`,
    is_female: true,
    description: `tootsie is such a loving dog`,
    color: `yellow`
  }

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

/**
 * will also consider undefined a string which calue is the string 'undefined'
 **/
const isNullOrUndefined = (myvariable) => {
  if (p_female === undefined || p_female == "undefined" || p_female === null ) {
    //
    pokus_logger.info(`    Puppy myvariable=[${myvariable}] : is neither null nor undefined`);
    return false;
  } else {
    //
    pokus_logger.info(`    Puppy myvariable=[${myvariable}] : is either null or undefined`);
    return true;
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
    pokus_logger.info(`    Puppy [p_female] : IS null`);
  } else {
    //
    pokus_logger.info(`    Puppy [p_female] : IS NOT null`);
  }

  if (p_female === undefined || p_female == "undefined" ) {
    //
    pokus_logger.info(`    Puppy [p_female] : IS undefined`);
  } else {
    //
    pokus_logger.info(`    Puppy [p_female] : is NOT undefined`);
  }

  if (p_female === undefined || p_female == "undefined" || p_female === null ) {
    //
    pokus_logger.info(`    Puppy [p_female] : is null or undefined`);
    p_femaleSkip = true;
  } else {
    //
    pokus_logger.info(`    Puppy [p_female] : is NEITHER null NOR undefined`);
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
 /**********************************************************************
  *   GET /api/v1/puppies Router / (protected) ()
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


  /*
  let pokusResponseCode = 500;
  let pokusResponseJSON = {
    message: `Pokus [POST /api/v1/puppies]: this is just an architecture test `,
    error: `database error`,
    search: searchCriterias
  };
  response.status(pokusResponseCode);
  response.json(pokusResponseJSON)

  next(new Error("JBL Stop debug point: this is just an architecture test"));
  */


  let pokusResponseCode = 599;
  let pokusResponseJSON = {};
  let retrievedPuppies = {};
  let searchCriterias = {};
  try {

      searchCriterias = {
        search_str: `${request.query.search}`,
        female: request.query.female || null,
        color: `${request.query.color}` || "",
        puppy_id: `${request.query.puppy_id}`
      }

      pokus_logger.info(`/************************************************************************* `);
      pokus_logger.info(`/****** TRACKER - [getPuppies = ()] , inspect [searchCriterias] params : `);
      pokus_logger.info(`/************************************************************************* `);
      pokus_logger.info(`    Puppy [searchCriterias] : `);
      pokus_logger.info(`${JSON.stringify(searchCriterias, " ", 2)}`);
      pokus_logger.info(`/************************************************************************* `);

      // --- // --- // --- // --- // --- // --- // --- // --- // --- // --- // --- // --- // --- //
      // --- // --- //        if the puppy_id request parameter is
      //                      sent, we ignore {search_str} {female} {color}
      //
      if (!isNullOrUndefined(searchCriterias.puppy_id)) {
        pokus_dal.getPuppyById(searchCriterias.puppy_id, function (docs) {
          pokus_logger.info(`**********************************************************************`);
          pokus_logger.info(``);
          pokus_logger.info(``);
          pokus_logger.info(` Pokus [GET /api/v1/puppies]: [pokus_dal.getPuppies] callback to retrieve a puppy from its Id :`);
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
            message: `Pokus [GET /api/v1/puppies]: [pokus_dal.getPuppies] callback to retrieve a puppy from its Id :`,
            search: {
              puppy_id: searchCriterias.puppy_id
            },
            results: docs
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

 /************************************************************************************
  ************************************************************************************
  *                          [OAuth2]
  ************************************************************************************
  **************/

 /************************************************************************************
  *   GET /google/callback Router / (Google OAuth2 Success):
  * ---> list all virtual machines
  **************/
  app.get('/google/callback', (request, response) => {
    /// response.send(`Pokus answers : Oh yes I al alive, very much alive !`)
    response.json({
      message: `Pokus answers : Oh you just successfully logged in with Google OAuth2 !`,
      whoami: `pokus`
    })
  })
  /************************************************************************************
   *   GET /restream/callback Router / (Restream OAuth2 Success):
   * ---> list all virtual machines
   **************/
   app.get('/google/callback', (request, response) => {
     /// response.send(`Pokus answers : Oh yes I al alive, very much alive !`)
     response.json({
       message: `Pokus answers : Oh you just successfully logged in with Restream OAuth2 !`,
       whoami: `pokus`
     })
   })





 /************************************************************************************
  ************************************************************************************
  *                 NO OTHER ROUTER AFTER THAT POINT : 404 must be last
  ************************************************************************************
  **************/

 /************************************************************************************
  ************************************************************************************
  *                          404
  ************************************************************************************
  **************/
 /************************************************************************************
  *   GET /static Router / (un-protected) (static folder served, for static pages like login 404 etc...)
  *
  *    +--> Since this is the last non-error-handling
  *    +--> middleware use()d, we assume 404, as nothing else
  *    +--> responded.
  *
  *    +--> $ curl -iv http://127.0.0.1:9099/notfound
  *    +--> $ curl -iv http://127.0.0.1:9099/notfound -H "Accept: application/json"
  *    +--> $ curl -iv http://127.0.0.1:9099/notfound -H "Accept: text/plain"
  *
  **************/
app.use(function(req, res, next){
 res.status(404);

 let requested_url_str = req.baseUrl + req.url;
 if (pokus_environment.getEnvironment().tsl_enabled) {
  requested_url_str = `https://${req.headers.host}${req.url}` ;
 } else {
  requested_url_str = `http://${req.headers.host}${req.url}` ;
 }

 // respond with html page
 if (req.accepts('html')) {
   pokus_logger.info(` Pokus : rendering 404 page for requested page :  [req.baseUrl] = [${req.baseUrl}]`);
   pokus_logger.info(` Pokus : rendering 404 page for requested page :  [req.headers] = [${JSON.stringify(req.headers, " ", 2)}]`);
   pokus_logger.info(` Pokus : rendering 404 page for requested page :  [req.url] = [${req.url}]`);
   pokus_logger.info(` Pokus : rendering 404 page for requested page : ${requested_url_str}`);


   res.render('404/v1/terminal', { requested_url: `${requested_url_str}` });
   return;
 }

 // respond with json
 if (req.accepts('json')) {
   res.send({ error: 'Not found' });
   return;
 }

 // default to plain-text. send()
 res.type('txt').send('Not found');
});














// sendFile will go here

app.listen(pokus_environment.getEnvironment().port_number, () => {
  pokus_logger.info(`Listening on http://${pokus_environment.getEnvironment().net_fqdn}:${pokus_environment.getEnvironment().port_number}`)
});
