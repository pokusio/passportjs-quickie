//Require Mongoose
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

//Define a schema
var Schema = mongoose.Schema;


// var connection = mongoose.createConnection("mongodb://localhost/myDatabase");
const initializeMongooseAutoIncrement = (connection) => {
  autoIncrement.initialize(connection);
}
/*
var bookSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Author' },
    title: String,
    genre: String,
    publishDate: Date
});
*/
var PuppySchema = new Schema({
  puppyId: { type: Schema.Types.ObjectId, ref: 'PuppyId' },
  cute_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  is_female: {
    type: Boolean,
    required: true
  },
  birth_date: Date
});

PuppySchema.plugin(autoIncrement.plugin, 'Puppy');

// var Book = connection.model('Book', bookSchema);

var PuppyModel = mongoose.model('PuppyModel', PuppySchema );



const getModels = () => {
  return { models: [
    {
      name: `PuppyModel`,
      model: PuppyModel
    }
  ]}
}
// Compile model from schema


module.exports = {
    getModels: getModels,
    initializeMongooseAutoIncrement: initializeMongooseAutoIncrement
};
