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
var UserSchema = new Schema({
  // userId: { type: Schema.Types.ObjectId, ref: 'UserId' }, /// I just want mongoose mongodb to manage thpse object id increment etc...
  fullname: { // the actual full nameof the user, to use to add invite him somewhere for example. IIt's there so users don't have to give up their email address to get invited into groups n stuf..
    type: String,
    required: true,
    unique: true
  },
  nickname: { // just a fancy name to dispaly as a user with gravatar stuf like that, and it does not have to be unique
    type: String,
    required: true
  },
  email: { // this is the one which shoulbe uniique
    type: String,
    required: true,
    unique: true
  },
  short_intro: { // users short introduction for people viewing their profile
    type: String,
    required: true
  },
  is_female: {
    type: Boolean,
    required: true
  },
  birth_date: {
    type: Date,
    required: false
  },
  phone: { // used for 2FA / MFA
    type: String,
    required: false
  },
  // ----------------------
  // Restream OAuth2
  // ----------------------
  restream_accessToken: {
    type: String,
    required: false
  },
  restream_refreshToken: {
    type: String,
    required: false
  },
  // ----------------------
  // Google OAuth2
  // ----------------------
  google_accessToken: {
    type: String,
    required: false
  },
  google_refreshToken: {
    type: String,
    required: false
  }
}, { collection: `users` });

// var Book = connection.model('Book', bookSchema);


// var connection = mongoose.createConnection("mongodb://localhost/myDatabase");
const initializeMongooseAutoIncrement = (connection) => {
  autoIncrement.initialize(connection);
  UserSchema.plugin(autoIncrement.plugin, 'UserId');
}
const getModel = () => {

  var UserModel = mongoose.model('UserModel', UserSchema );

  return {
        name: `UserModel`,
        model: UserModel
      }
}
// Compile model from schema


module.exports = {
    getModel: getModel,
    initializeMongooseAutoIncrement: initializeMongooseAutoIncrement
};
