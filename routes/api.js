const express = require ('express');
const router = express.Router();
const Team = require('../models/team');
const League = require('../models/league');

router.get('/teams', (req, res, next) => {
  Team.find({})
    .then(data => res.json(data))
    .catch(next)
});

router.get('/leagues', (req, res, next) => {
  League.find({})
    .then(data => res.json(data))
    .catch(next)
});




module.exports = router;