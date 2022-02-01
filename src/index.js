const express = require("express")
const winston = require('winston');
const path = require('path');
const ejs = require('ejs');

const hugo = require("./middlewares/hugo")

const tlsEnabled = process.env.TLS_ENABLED || false;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});


logger.info(`/************************************************************************* `);
logger.info(`/****** Initializing Winston logs : `);
logger.info(`/************************************************************************* `);
logger.info(`    [process.env.LOG_LEVEL] : ${process.env.LOG_LEVEL}`);
logger.error(`Winston Init Tests:  error message`);
logger.warn(`Winston Init Tests:  warn message`);
logger.info(`Winston Init Tests:  info message`);
logger.verbose(`Winston Init Tests:  verbose message`);
logger.debug(`Winston Init Tests:  debug message`);
logger.silly(`Winston Init Tests:  silly message`);
logger.info(`/************************************************************************* `);
logger.info(`/************************************************************************* `);




const app = express()


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
 **************/
app.get('/api/v1/', (request, response) => {
   response.status(302);
  // response.send(`Hello Pokus !`)
  /* response.redirect(`https://static.pok-us.io`) */
  response.redirect(`https://api-docs.pok-us.io`)

  // respond with html page
  if (req.accepts('html')) {
   res.render('404/v1/terminal', { requested_url: req.url });
   return;
  }

  // respond with json
  if (req.accepts('json')) {
   res.send({ error: 'Not found' });
   return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');

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
    message: `Pokus answers : Oh yes I al alive, very much alive !`,
    whoami: `pokus`
  })
})


/************************************************************************************
 *   GET /api/v1/login Router :
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
  *   GET /api/v1/login Router :
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
  *   GET /static Router / (un-protected) (static folder served, for static pages like login 404 etc...)
  **************/
 app.use(express.static(`${__dirname}/static`))




 /************************************************************************************
  *   GET /static Router / (un-protected) (static folder served, for static pages like login 404 etc...)
  *
  *    +--> Since this is the last non-error-handling
  *    +--> middleware use()d, we assume 404, as nothing else
  *    +--> responded.
  *
  *    +--> $ curl http://localhost:3000/notfound
  *    +--> $ curl http://localhost:3000/notfound -H "Accept: application/json"
  *    +--> $ curl http://localhost:3000/notfound -H "Accept: text/plain"
  *
  **************/







app.use(function(req, res, next){
 res.status(404);

 let requested_url_str = req.baseUrl + req.url;
 if (tlsEnabled) {
  requested_url_str = `https://${req.headers.host}${req.url}` ;
 } else {
  requested_url_str = `http://${req.headers.host}${req.url}` ;
 }

 // respond with html page
 if (req.accepts('html')) {
   logger.info(` Pokus : rendering 404 page for requested page :  [req.baseUrl] = [${req.baseUrl}]`);
   logger.info(` Pokus : rendering 404 page for requested page :  [req.headers] = [${JSON.stringify(req.headers, " ", 2)}]`);
   logger.info(` Pokus : rendering 404 page for requested page :  [req.url] = [${req.url}]`);
   logger.info(` Pokus : rendering 404 page for requested page : ${requested_url_str}`);


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












const port_number = process.env.POKUS_PORT || 8088;
const net_host = process.env.POKUS_NET_HOST || `127.0.0.1`;

// sendFile will go here

app.listen(port_number, () => {
  console.info(`Listening on http://${net_host}:${port_number}`)
});
