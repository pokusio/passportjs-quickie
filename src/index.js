const express = require("express")
const winston = require('winston');

const path = require('path');
const ejs = require('ejs');

const hugo = require("./middlewares/hugo")
const pokus_environment = require("./environment/")
const pokus_logging = require("./logger/")
const pokus_dal = require("./dal/")


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
  const puppyFromReq = {
    cute_name: `${request.params.cute_name}`,
    is_female: request.params.is_female,
    description: `${request.params.description}`
  }
  let requested_url_str = request.url;
  pokus_logger.info(` Pokus [POST /api/v1/puppies]: the puppy to add to the database is : ${JSON.stringify(puppyFromReq, " ", 2)} rendering 404 page for requested page : ${requested_url_str}`);

  const testPuppy = {
    cute_name: `tootsie`,
    is_female: true,
    description: `tootsie is such a loving dog`
  }
  pokus_dal.testDbWrites(testPuppy.cute_name, testPuppy.is_female, testPuppy.description);
  pokus_dal.testDbWrites(testPuppy.cute_name, testPuppy.is_female, testPuppy.description);

  /// response.send(`Pokus answers : Oh yes I al alive, very much alive !`)
  pokus_logger.info(` `);

  response.status(201);
  response.json({
    message: `Pokus [POST /api/v1/puppies]: the puppy below described puppy was successfully added to the database : ${JSON.stringify(puppyFromReq, " ", 2)} rendering 404 page for requested page : ${requested_url_str}`,
    puppy: puppyFromReq
  })
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
