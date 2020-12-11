const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Team = require("../models/team");

//create schema for Game
const GameSchema = new Schema({
	date: Date,
	name: String,
	shortName: String,
	away: String,
	home: String,
	venueName: String,
	venueAddress: String,
	awayTeam: Object,
	homeTeam: Object,
	spread: Object,
	status: Object,
	broadcast: Object,
});

//create model for Game
const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
