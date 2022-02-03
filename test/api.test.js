const path = require('path');
const newman = require('newman'); // require newman in your project


/*
const newmanMocha = new NewmanMocha({
  collection: path.join(__dirname, 'postman_collection.json'),
  environment: path.join(__dirname, 'postman_environment.json'),
});
*/


// -----
// run tests for the puppies endpoint

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('./api/endpoint/puppies/CRUD_R/spec.newman.json'),
    reporters: ['htmlextra', 'json', 'cli', 'newman-reporter-htmlextra-and-perf']
}, function (err) {
	if (err) { throw err; }
    console.log('collection run complete!');
});

/*


newman.run({
    collection: require('./api/endpoint/puppies/CRUD_C/spec.newman.json'),
    reporters: 'cli'
}, function (err) {
	if (err) { throw err; }
    console.log('collection run complete!');
});



newman.run({
    collection: require('./api/endpoint/puppies/CRUD_U/spec.newman.json'),
    reporters: 'cli'
}, function (err) {
	if (err) { throw err; }
    console.log('collection run complete!');
});

newman.run({
    collection: require('./api/endpoint/puppies/CRUD_D/spec.newman.json'),
    reporters: 'cli'
}, function (err) {
	if (err) { throw err; }
    console.log('collection run complete!');
});


*/

// newmanMocha.runDirectory(path.join(__dirname, 'api/endpoint/puppies'));
