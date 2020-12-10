const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Team = mongoose.model('Team');


//create schema for Game
const GameSchema = new Schema({
  Date: Date,
  Away:String,
  Home:String,
  AwayTeam: Team.schema,
  HomeTeam: Team.schema,
  Spread: Number,
  SpreadNote: String,
  Status: String
})

//create model for Game
const Game = mongoose.model('Game', GameSchema);

module.exports = Game;