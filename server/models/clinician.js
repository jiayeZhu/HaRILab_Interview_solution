const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clinicianSchema = new Schema({
  username: String,
  password: String,
},{timestamps:true})

module.exports = mongoose.model('Clinician',clinicianSchema)