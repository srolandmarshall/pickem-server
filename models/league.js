const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Team = mongoose.model('Team');


//create schema for League
const LeagueSchema = new Schema({
  name: String,
  sport: String,
  teams: [Team.schema]
})

//create model for League
const League = mongoose.model('League', LeagueSchema);

module.exports = League;