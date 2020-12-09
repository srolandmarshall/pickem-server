const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TeamSchema = require('./team.js');


//create schema for League
const LeagueSchema = new Schema({
  name: String,
  sport: String,
  teams: [TeamSchema]
})

//create model for League
const League = mongoose.model('League', LeagueSchema);

module.exports = League;