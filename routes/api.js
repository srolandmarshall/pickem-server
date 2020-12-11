const express = require("express");
const router = express.Router();
const Team = require("../models/team");
const League = require("../models/league");
const Game = require("../models/game");

router.get("/teams", (req, res, next) => {
	Team.find({})
		.then((data) => res.json(data))
		.catch(next);
});

router.get("/teams/:id", (req, res, next) => {
	let id = req.params.id;
	Team.findById(id)
		.then((data) => res.json(data))
		.catch(next);
});

router.get("/teams/by_abr/:abr", (req, res, next) => {
	let abr = req.params.abr;
	Team.findOne({ abr: abr })
		.then((data) => res.json(data))
		.catch(next);
});

router.get("/leagues", (req, res, next) => {
	League.find({})
		.then((data) => res.json(data))
		.catch(next);
});

router.get("/games", (req, res, next) => {
	Game.find({})
		.then((data) => res.json(data))
		.catch(next);
});

router.get("/games/final", (req, res, next) => {
	Game.find({ "status.type.name": "STATUS_FINAL" })
		.then((data) => res.json(data))
		.catch(next);
});

router.get("/games/upcoming", (req, res, next) => {
	Game.find({ "status.type.name": "STATUS_SCHEDULED" })
		.then((data) => res.json(data))
		.catch(next);
});

// router.post("/games", (req, res, next) => {
// 	if (req.body) {
// 		Game.create(req.body)
// 			.then((data) => res.json(data))
// 			.catch(next);
// 	} else {
// 		res.json({
// 			error: "There was a problem creating this game.",
// 		});
// 	}
// });

module.exports = router;
