const express = require('express');
const router = express.Router();
const UserRouter = require("./users")
const ClinicianRouter = require('./clinician')

/**
 * router manager
 */

// user router
router.use('/user/', UserRouter)

// clinician router
router.use('/clinician/',ClinicianRouter)

module.exports = router;
