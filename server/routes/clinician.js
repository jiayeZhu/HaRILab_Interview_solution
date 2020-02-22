const express = require('express');
const ClinicianRouter = express.Router();

ClinicianRouter.get('/', function(req, res, next) {
  res.json({errorCode:0, msg:'router for clinician'})
});

module.exports = ClinicianRouter;

