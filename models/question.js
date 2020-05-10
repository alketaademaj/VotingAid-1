var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  question: {type: String, Required: 'Kysymys on lisättävä'},
  area: {type: String, Required: 'Oletuksena Undefined'},
  },
  {versionKey: false},
  {collection: 'questions'}
  );

module.exports = mongoose.model('question',questionSchema);
