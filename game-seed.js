const mongoose = require("mongoose");
const axios = require("axios");
const Team = require("./models/team");
const Game = require("./models/game");
const { response } = require("express");

require("dotenv").config();

const getGameData = async () => {
	return axios
		.get(
			"https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard"
		)
		.then((res) => res.data.events);
};

const setGames = async () => {
	const gameData = await getGameData();
	return gameData.map(
		(event) =>
			new Game({
				Date: event.date,
				Name: event.name,
				shortName: event.shortName,
				Away: getTeamAbr(event, "AWAY"),
				Home: getTeamAbr(event, "HOME"),
				venueName: createVenueName(event),
				venueAddress: createAddress(event),
				AwayTeam: getTeamByAbr(getTeamAbr(event, "AWAY")),
				HomeTeam: getTeamByAbr(getTeamAbr(event, "HOME")),
				Spread: event.competitions[0].odds[0],
				Status: event.status,
				Broadcast: event.competitions.broadcasts,
			})
	);
};

const createVenueName = (event) => {
	event.competitions.venue ? event.competitions.venue.fullName : "N/A";
};

const createAddress = (event) => {
	event.competitions.venue
		? event.competitions.venue.address.city +
		  ", " +
		  event.competitions.venue.address.state
		: "N/A";
};

const getTeamAbr = (event, side) => {
	switch (side.toUpperCase()) {
		case "HOME": {
			return event.shortName.split(" @ ")[1];
		}
		case "AWAY": {
			return event.shortName.split(" @ ")[0];
		}
		default: {
			return "ERR";
		}
	}
};

const getTeamByAbr = async (abr) => {
	const query = Team.findOne({ abr: abr });
	query.getFilter();
	const team = await query.exec;
	return team;
};

mongoose
	.connect(process.env.DB, { useNewUrlParser: true })
	.catch((err) => {
		console.log(err.stack);
		process.exit(1);
	})
	.then(() => {
		console.log("Connected to DB");
	});

const createGames = async () => {
	const games = await setGames();
	console.log(games);
	games.map(async (game, index) => {
		console.log(`Saving ${game.Name}`);
		await game.save((err, res) => {
			if (index === games.length - 1) {
				console.log("Done seeding");
				mongoose.disconnect();
			}
		});
	});
};

createGames();
