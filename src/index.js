const express = require("express")
const hugo = require("./middlewares/hugo")


const app = express()

/************************************************************************************
 *   EJS Template + Hugo ?
 *    -->  Do I have keywords (langugage reserved) words that are both used by hugo and EJS ?
 *    -->  I run the hugo build, and I get an EJS valid template ?
 *    -->  Well there is ne special case, where we can be assured the answer is yes :
 *         ++ > in the case of 404 pages :
 *              + typically, there is nothing specific to te user in 404
 *              + we can assume that : a lot of people do use 404 pages that are seen exactly the same by all users, authneticaed and non authenticated users.
 *              + If the 404 needs to be different for authenticated users, then we can still usehugo to geenrate the EJSwe wwant, for a partiular project...
 *         ++ > in the case of 40
 *
 *
 *
 *
 *
 *
 *
 **************/





/************************************************************************************
 *   GET / Router / (un-protected)
 **************/
app.get('/', (request, response) => {
   res.status(302);
  response.send('Hello Pokus !')
})
/************************************************************************************
 *   GET /api/v1 Router / (un-protected) :
 * ---> gives a beautiful hugo geenrated OpenAPI Doc, with all the api documentation, served at /api/v1
 * ---> the hugo generated project for the doc contains and versions in the data folder, the [openapi.json] file
 **************/
app.get('/api/v1/', (request, response) => {
   res.status(302);
  // response.send(`Hello Pokus !`)
  /* response.redirect(`https://static.pok-us.io`) */
  response.redirect(`https://api-docs.pok-us.io`)

})
/************************************************************************************
 *   GET /api/ Router / (un-protected) :
 * ---> returns a beautiful 404
 * ---> that 404 is a hugo project
 **************/
app.get('/api', (request, response) => {
   res.status(404);
  response.send('Hello Pokus !')
})



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






const port_number = process.env.POKUS_PORT || 8088;
const net_host = process.env.POKUS_NET_HOST || `127.0.0.1`;

// sendFile will go here

app.listen(port_number, () => {
  console.info(`Listening on http://${net_host}:${port_number}`)
});
