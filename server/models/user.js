const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  uuid: String,
  attacks: [{type: Schema.Types.ObjectId, ref: 'Attack'}]
})

module.exports = mongoose.model('User',userSchema)
