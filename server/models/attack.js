const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attackSchema = new Schema({
  date: Schema.Types.Date,
  location: Number,
  userId: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

module.exports = mongoose.model('Attack',attackSchema)
