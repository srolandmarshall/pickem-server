const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for Team
const TeamSchema = new Schema({
  action: {
    type: String,
    required: [true, 'The Team text field is required']
  }
})

//create model for Team
const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;