const express = require("express")
const passport = require("passport")
const winston = require('winston')
const path = require('path')
const ejs = require('ejs')

const hugo = require("./middlewares/hugo")
const pokus_environment = require("./environment/")
const pokus_logging = require("./logger/")
const pokus_dal = require("./dal/")


/// const pokus_secrets = require("./pokus_secrets/")
/// const pokusClientID = pokus_secrets.getRestreamioOauth2Secrets().clientID;
/// const pokusClientSecret = pokus_secrets.getRestreamioOauth2Secrets().clientSecret;

/// const pokus_restream_auth = require("./auth/restream/")
/// // const pokus_restream_auth = require("./auth/google/")

require("./auth/restream/")
require("./auth/google/")
// require("./auth/google/")

/*** REQUIRES FOR API ENDPOINTS ROUTERS
 *
 **/
// puppies
const puppiesRouter = require('./api/routes/puppies/router');
// users
const usersRouter = require('./api/routes/users/router');
// const virtualboxMachinesApiEndpoint = require("./api/routes/virtualbox/machines/")
// const virtualboxDisksApiEndpoint = require("./api/routes/virtualbox/disks/")
// const virtualboxSnapshotsApiEndpoint = require("./api/routes/virtualbox/snapshots/")


const pokus_logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});

pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`/****** POKUS BOX APP ROOT Initializing Winston logs : `);
pokus_logger.info(`/************************************************************************* `);
pokus_logger.info(`    [process.env.LOG_LEVEL] : ${process.env.LOG_LEVEL}`);
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


app.use(puppiesRouter);
app.use(usersRouter);
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
 ************************************************************************************
 ************************************************************************************
 *   GET /login Router / (un-protected) : Login page
 **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** ****
 *   GET /oauth2/google    Router   : target of the "Login with Google" button
 *   GET /oauth2/restream  Router   : target of the "Login with Restream" button
 *   GET /oauth2/github    Router   : target of the "Login with Github" button
 ************************************************************************************
 ************************************************************************************
 ************************************************************************************
 **/

/************************************************************************************
 *   GET /login Router / (un-protected) :
 * ---> trigger the Oauth2 Authentication flow
 **************/
 app.get('/login', (request, response) => {

   let requested_url_str = request.baseUrl + request.url;
   if (pokus_environment.getEnvironment().tls_enabled) {
    requested_url_str = `https://${request.headers.host}${request.url}` ;
   } else {
    requested_url_str = `http://${request.headers.host}${request.url}` ;
   }
   response.render('login/index.ejs', { requested_url: `${requested_url_str}` , cache: false });
  /*
   response.json({
     message: `Pokus Box Authentication : use the POST method to authenticate !`,
     whoami: `pokus`
   }) */
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
  app.get('/oauth2/google', passport.authenticate('google', { scope:
        [ 'email', 'profile' ] }
  ));
  app.get('/oauth2/google/callback', passport.authenticate( 'google', {
          successRedirect: '/auth/google/success',
          failureRedirect: '/auth/google/failure'
  }));
  /************************************************************************************
   *   GET /oauth2/restream/callback Router / (Restream OAuth2 Success):
   * ---> list all virtual machines
   **************/

   /*
   app.get('/oauth2/restream', passport.authenticate('oauth2', { scope:
         [ 'email', 'profile' ] }
   ));*/
   app.get('/oauth2/restream', passport.authenticate('oauth2'));

   app.get('/oauth2/restream/callback', passport.authenticate('oauth2', {
           successRedirect: '/auth/restream/success',
           failureRedirect: '/auth/restream/failure'
   }));


   /************************************************************************************
    *   GET /oauth2/restream/ Router / (Restream OAuth2 Success):
    * ---> list all virtual machines
    **************/


 /************************************************************************************
  ************************************************************************************
  *                 ERROR HANDLER
  ************************************************************************************
  **************/
/*  */
app.use(function (err, req, res, next) {
  pokus_logger.warn(`********************************************************************************************`)
  pokus_logger.warn(`  POKUS ERROR HANDLER JUST CATCHED THIS ERROR : [${JSON.stringify(err, " ", 2)}]`)
  pokus_logger.warn(`  POKUS ERROR HANDLER JUST CATCHED THIS ERROR : `)
  pokus_logger.warn(err)
  pokus_logger.warn(`********************************************************************************************`)
  res.status(500)
  let requested_url_str = req.baseUrl + req.url;
  if (pokus_environment.getEnvironment().tls_enabled) {
   requested_url_str = `https://${req.headers.host}${req.url}` ;
  } else {
   requested_url_str = `http://${req.headers.host}${req.url}` ;
  }
  res.render('500/v1/terminal', { requested_url: `${requested_url_str}`, root_cause: `${JSON.stringify(err.stack, " ", 2)}` });

})

 /************************************************************************************
  ************************************************************************************
  *                 NO OTHER ROUTER AFTER THAT POINT : 404 must be last
  ************************************************************************************
  **************/
/*
app.get('/404', function(req, res, next){
  // trigger a 404 since no other middleware
  // will match /404 after this one, and we're not
  // responding here
  next();
});

app.get('/403', function(req, res, next){
  // trigger a 403 error
  var err = new Error('not allowed!');
  err.status = 403;
  next(err);
});

app.get('/500', function(req, res, next){
  // trigger a generic (500) error
  next(new Error('keyboard cat!'));
});
*/
// Error handlers

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.

// $ curl http://localhost:3000/notfound
// $ curl http://localhost:3000/notfound -H "Accept: application/json"
// $ curl http://localhost:3000/notfound -H "Accept: text/plain"


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
 if (pokus_environment.getEnvironment().tls_enabled) {
  requested_url_str = `https://${req.headers.host}${req.url}` ;
 } else {
  requested_url_str = `http://${req.headers.host}${req.url}` ;
 }

 res.format({
   html: function () {
     /// res.render('404', { url: req.url })
     pokus_logger.info(` Pokus : rendering 404 page for requested page :  [req.baseUrl] = [${req.baseUrl}]`);
     pokus_logger.info(` Pokus : rendering 404 page for requested page :  [req.headers] = [${JSON.stringify(req.headers, " ", 2)}]`);
     pokus_logger.info(` Pokus : rendering 404 page for requested page :  [req.url] = [${req.url}]`);
     pokus_logger.info(` Pokus : rendering 404 page for requested page : ${requested_url_str}`);


     res.render('404/v1/terminal', { requested_url: `${requested_url_str}` });

   },
   json: function () {
     res.json({ error: 'Not found' })
   },
   default: function () {
     res.type('txt').send('Not found')
   }
 })
});

/*  */

app.listen(pokus_environment.getEnvironment().port_number, () => {
  pokus_logger.info(`PokuBox Listening on http://${pokus_environment.getEnvironment().net_fqdn}:${pokus_environment.getEnvironment().port_number}`)
});
