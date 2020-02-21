const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clinicianSchema = new Schema({
  username: String,
  password: String,
})

module.exports = mongoose.model('Clinician',clinicianSchema)