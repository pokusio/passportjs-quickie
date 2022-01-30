const express = require("express")
const hugo = require("./middlewares/hugo")


const app = express()
app.set('view engine', 'pug') // Confguration of the Template Engine "EJS"
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
  response.send('Hello Pokus !')
})
/************************************************************************************
 *   GET /api Router / (un-protected) :
 * ---> gives a beautiful hugo geenrated 404
 * ---> or a redirect to the
 **************/
app.get('/api/v1', (request, response) => {
  // response.send(`Hello Pokus !`)
  response.redirect(`https://static.pok-us.io`)

})
/************************************************************************************
 *   GET /api/v1 Router / (un-protected) :
 * ---> returns a 404
 * ---> that 404 is a hugo project
 **************/
app.get('/api', (request, response) => {
   res.status(404);


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


const port_number = process.env.POKUS_PORT || 8088;

// sendFile will go here

app.listen(port_number);
