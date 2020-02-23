const express = require('express');
const ClinicianRouter = express.Router();
const {check} = require('express-validator')
const {ClinicianModel} = require("../models")
const {MakeResponse, checkValidationResult, encrypt} = require('../utils')

/**
 * 
 * @api {POST} /api/clinician Create new clinician account
 * @apiName CreatClinician
 * @apiGroup Clinician
 * @apiVersion  0.0.1
 * 
 * @apiParam  (Body Parameter) {String} username  clinician's username.
 * @apiParam  (Body Parameter) {String} password  clinician's password. should already be hashed using MD5. should in lowercase.
 * 
 * @apiSuccess (Succeeded) {Number} errorCode   response error code, should be 0.
 * @apiSuccess (Succeeded) {Object} msg         message to client.
 * @apiSuccess (Succeeded) {String} msg.clinicianId  clinician's unique clinicianId.
 * 
 * @apiError   (Failed) {Number} errorCode   response error code, should not be 0.
 * @apiError   (Failed) {String} msg         error message
 * 
 * @apiParamExample  {json} Request-Example:
 * {
 *     username : "JohnDoe123",
 *     password : "d8a3d82529a5fcaad87c0b592cc46fbf"
 * }
 * 
 * @apiSuccessExample {json} Success-Response-Example:
 * {
 *     errorCode : 0,
 *     msg : {
 *       clinicianId : "5e522919db3dda5dd0224a6d"
 *     }
 * }
 * 
 * @apiErrorExample {json} Error-Response-Example:
 * {
 *   errorCode : 104,
 *   msg : "clinician username exist"
 * }
 */
ClinicianRouter.post('/',[
  //username should be string
  check('username').notEmpty().isString(),
  //password shoud be MD5 string
  check('password').notEmpty().isMD5(),
  //check validation result
  checkValidationResult
], async(req,res,next)=>{
  let {username, password} = req.body
  //check username existance
  try {
    let result = await ClinicianModel.findOne({username}).exec()
    if(result !== null) return MakeResponse(res,104)
  } catch (error) {
    console.error("faield to check clinician username existance with error message: ",error.message)
    return MakeResponse(res,999)
  }

  //encrypt the password again using hmac-sha256 before storing into the db
  password = encrypt(password)
  //create and save the clinician
  let clinician = new ClinicianModel({username,password})
  try {
    await clinician.save()
    req.session.level = 'clinician'
    return MakeResponse(res,0,{clinicianId:clinician._id})
  } catch (error) {
    console.error("failed to save new clinician with error message: ",error.message)
    return MakeResponse(res,999)
  }
})

/**
 * 
 * @api {POST} /api/clinician/:username/session Create new clinician session
 * @apiName CreatSession
 * @apiGroup Clinician
 * @apiVersion  0.0.1
 * 
 * @apiParam  (Path Parameter) {String} username  clinician's username.
 * @apiParam  (Body Parameter) {String} password  clinician's password. should be md5 hashed string (lowercase).
 * 
 * @apiSuccess (Succeeded) {Number} errorCode   response error code, should be 0.
 * @apiSuccess (Succeeded) {Object} msg         message to client.
 * @apiSuccess (Succeeded) {String} msg.clinicianId  clinician's unique clinicianId.
 * 
 * @apiError   (Failed) {Number} errorCode   response error code, should not be 0.
 * @apiError   (Failed) {String} msg         error message
 * 
 * @apiParamExample  {json} Request-Example:
 * {
 *     password : "d8a3d82529a5fcaad87c0b592cc46fbf"
 * }
 * 
 * @apiSuccessExample {json} Success-Response-Example:
 * {
 *     errorCode : 0,
 *     msg : {
 *       clinicianId : "5e522919db3dda5dd0224a6d"
 *     }
 * }
 * 
 * @apiErrorExample {HTTP-StatusCode} Error-Response-Example:
 * {
 *   errorCode : 105,
 *   msg : "clinician username password missmatch"
 * }
 * 
 */
ClinicianRouter.post('/:username/session',[
  //username should be string
  check('username').notEmpty().isString(),
  //password shoud be MD5 string
  check('password').notEmpty().isMD5(),
  //check validation result
  checkValidationResult
],async (req,res,next)=>{
  //try to match username and password in the db
  let {username} = req.params
  let {password} = req.body
  //encrypt the password before matching
  password = encrypt(password)
  try {
    let result = await ClinicianModel.findOne({username,password}).select('_id').exec()
    if (result === null) return MakeResponse(res,105)
    else {
      req.session.level = 'clinician'
      return MakeResponse(res,0,{clinicianId:result._id})
    }
  } catch (error) {
    console.error("clinician login failed with error message: ",error.message)
    return MakeResponse(res,999)
  }
})

module.exports = ClinicianRouter;

