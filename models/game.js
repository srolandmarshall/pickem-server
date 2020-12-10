const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Team = mongoose.model("Team");

//create schema for Game
const GameSchema = new Schema({
	Date: Date,
	Name: String,
	shortName: String,
	Away: String,
	Home: String,
	venueName: String,
	venueAddress: String,
	AwayTeam: Team.schema,
	HomeTeam: Team.schema,
	Spread: Object,
	Status: Object,
	Broadcast: Object,
});

//create model for Game
const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
