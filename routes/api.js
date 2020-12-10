const express = require ('express');
const router = express.Router();
const Team = require('../models/team');
const League = require('../models/league');
const Game = require('../models/game');

router.get('/teams', (req, res, next) => {
  Team.find({})
    .then(data => res.json(data))
    .catch(next)
});

router.get('/teams/:id', (req, res, next) => {
  let id = req.params.id;
  Team.findById(id)
    .then(data => res.json(data))
    .catch(next)
});

router.get('/teams/by_abr/:abr', (req, res, next) => {
  let abr = req.params.abr;
  Team.findOne({abr:abr})
    .then(data => res.json(data))
    .catch(next)
});

router.get('/leagues', (req, res, next) => {
  League.find({})
    .then(data => res.json(data))
    .catch(next)
});

router.get('/games', (req, res, next) => {
  Game.find({})
    .then(data => res.json(data))
    .catch(next)
});




module.exports = router;