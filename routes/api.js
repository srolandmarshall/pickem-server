const express = require ('express');
const router = express.Router();
const Team = require('../models/team');

router.get('/teams', (req, res, next) => {
  Team.find({})
    .then(data => res.json(data))
    .catch(next)
});

router.post('/teams', (req, res, next) => {
  if(req.body.action){
    Team.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.delete('/teams/:id', (req, res, next) => {
  Team.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router;