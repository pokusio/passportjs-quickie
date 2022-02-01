//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var PuppySchema = new Schema({
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
    getModels: getModels
};
