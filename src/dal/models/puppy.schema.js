//Require Mongoose
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment'); /// this plugin uses the 'identitycounters' collection in the pokus database

//Define a schema
var Schema = mongoose.Schema;

/*
var bookSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Author' },
    title: String,
    genre: String,
    publishDate: Date
});
*/
var PuppySchema = new Schema({
  // puppyId: { type: Schema.Types.ObjectId, ref: 'PuppyId' }, /// I just want mongoose mongodb to manage thpse object id increment etc...
  cute_name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  is_female: {
    type: Boolean,
    required: true
  },
  color: {
    type: String,
    required: false
  },
  birth_date: Date
}, { collection: `puppies` });

// var Book = connection.model('Book', bookSchema);

// var connection = mongoose.createConnection("mongodb://localhost/myDatabase");
const initializeMongooseAutoIncrement = (connection) => {
  autoIncrement.initialize(connection);
  PuppySchema.plugin(autoIncrement.plugin, 'PuppyId');
}

const getModel = () => {

  var PuppyModel = mongoose.model('PuppyModel', PuppySchema );

  return {
        name: `PuppyModel`,
        model: PuppyModel
      }
}
// Compile model from schema


module.exports = {
    getModel: getModel,
    initializeMongooseAutoIncrement: initializeMongooseAutoIncrement
};
