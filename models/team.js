const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for Team
const TeamSchema = new Schema({
  city: String,
  name: String,
  abr: String,
  conf: String,
  div: String
})

//create model for Team
const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;