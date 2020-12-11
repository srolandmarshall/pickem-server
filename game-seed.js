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
				date: event.date,
				name: event.name,
				shortName: event.shortName,
				away: getTeamAbr(event, "AWAY"),
				home: getTeamAbr(event, "HOME"),
				venueName: createVenueName(event),
				venueAddress: createAddress(event),
				spread: createOdds(event),
				status: event.status,
				broadcast: event.competitions.broadcasts,
			})
	);
};

function createOdds(event) {
	return event.competitions[0].odds ? event.competitions[0].odds[0] : null;
}

const createVenueName = (event) => {
	return event.competitions[0].venue
		? event.competitions[0].venue.fullName
		: "N/A";
};

const createAddress = (event) => {
	return event.competitions[0].venue
		? event.competitions[0].venue.address.city +
				", " +
				event.competitions[0].venue.address.state
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

// const getTeamByAbr = async (abr) => {
// 	console.log("Getting Team by abbr.");
// 	const response = axios
// 		.get(`/teams/by_abr/?abr=${abr}`)
// 		.then((res) => res.data);

// 	return response;
// };

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
	games.map(async (game, index) => {
		console.log(`Saving ${game.name}`);
		await game.save((err, res) => {
			if (index === games.length - 1) {
				console.log("Done seeding");
				mongoose.disconnect();
			}
		});
	});
};

const clearGames = () => {
	console.log("Deleting all the games...");
	Game.collection.drop();
};

function run(params) {
	clearGames();
	createGames();
}

run();
