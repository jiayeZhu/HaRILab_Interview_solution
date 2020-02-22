const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attackSchema = new Schema({
  date: Schema.Types.Date, // should not split date and time. store the whole ISO8601 Date is more useful and robust when dealing with different timezone
  location: Number,
  userId: {type: Schema.Types.ObjectId, ref: 'User'}
},{timestamps:true})
attackSchema.index({date:1,userId:1}, {unique: true})

module.exports = mongoose.model('Attack',attackSchema)
