const express = require('express')
const UserRouter = express.Router()
const {check, validationResult} = require('express-validator')
const {UserModel, AttackModel} = require("../models")
const {MakeResponse} = require('../utils')

UserRouter.get('/', function(req, res, next) {
  res.json({errorCode:0, msg:'router for user'})
})

/**
 * 
 * @api {POST} /api/user Create new user record with device uuid
 * @apiName CreatUser
 * @apiGroup User
 * @apiVersion  0.0.1
 * 
 * @apiParam  (Body Parameter) {String} username user's username.
 * @apiParam  (Body Parameter) {String} uuid     uuid of user's device.
 * 
 * @apiSuccess (Succeeded) {Number} errorCode   response error code, should be 0.
 * @apiSuccess (Succeeded) {Object} msg         message to client.
 * @apiSuccess (Succeeded) {String} msg.userId  user's unique userId.
 * 
 * @apiError   (Failed) {Number} errorCode   response error code, should not be 0.
 * @apiError   (Failed) {String} msg         error message
 * 
 * @apiParamExample  {json} Request-Example:
 * {
 *     username : "JohnDoe123",
 *     uuid : "84AE7AA1-7000-4696-8A74-4FD588A4A5C7"
 * }
 * 
 * @apiSuccessExample {json} Success-Response-Example:
 * {
 *     errorCode : 0,
 *     msg : {
 *       userId : "5e50569d9c01c65ba494ee1d"
 *     }
 * }
 * 
 * @apiErrorExample {json} Error-Response-Example:
 * {
 *   errorCode : 102,
 *   msg : "Username or UUID exist"
 * }
 */
UserRouter.post('/',[
  //username should be string and not empty
  check('username').notEmpty().isString(),
  //uuid should be string and not empty
  check('uuid').notEmpty().isString()
], async (req, res, next) => {
  //check validation result
  const validationErrors = validationResult(req)
  if(!validationErrors.isEmpty()) return MakeResponse(res,101)

  //check username and uuid existance
  let {username, uuid} = req.body
  try {
    let result = await UserModel.findOne({$or:[{username},{uuid}]}).exec()
    //reject if user or uuid existed
    if(result !== null) return MakeResponse(res,102)
  } catch (error) {
    console.error("check user existance failed with error: ",error.message)
    return MakeResponse(res,999)
  }

  //save user info and return userid for client side use
  let User = new UserModel({username,uuid})
  try {
    let {_id} = await User.save()
    return MakeResponse(res,0,{userId:_id})
  } catch (error) {
    console.error("create user failed with error: ",error.message)
    return MakeResponse(res,999)
  }
})


/**
 * 
 * @api {POST} /api/user/:userId/attack Report new attack
 * @apiName ReportAttack
 * @apiGroup User
 * @apiVersion  0.0.1
 * 
 * 
 * @apiParam  (Path Parameter) {String}     userId    unique userId.
 * @apiParam  (Body Parameter) {Date}       date      the ISO8601 format of JS Date Object representing the date and time of the attack.
 * @apiParam  (Body Parameter) {Number=0,1} location  answer to the location question. 0 means outside, 1 means inside
 * 
 * @apiSuccess (Succeeded) {Number} errorCode   response error code, should be 0.
 * @apiSuccess (Succeeded) {String} msg         message to client, should be ''.
 * 
 * @apiError   (Failed) {Number} errorCode   response error code, should not be 0.
 * @apiError   (Failed) {String} msg         error message
 * 
 * @apiParamExample  {json} Request-Example:
 * {
 *     date : "2020-02-21T23:52:28.264Z",
 *     location : 1
 * }
 * 
 * @apiSuccessExample {json} Success-Response-Example:
 * {
 *     errorCode : 0,
 *     msg : ''
 * }
 * 
 * @apiErrorExample {json} Error-Response-Example:
 * {
 *   errorCode : 103,
 *   msg : "userId does not exist"
 * }
 * 
 */
UserRouter.post('/:userId/attack',[
  //date should be ISO8601 date
  check('date').notEmpty().isISO8601(),
  //location should be in [0,1] 0 means outside, 1 means inside
  check('location').notEmpty().isIn([0,1]),
  //userid should be valid mongoid
  check('userId').notEmpty().isMongoId()
],async (req,res,nect)=>{
  //check validation result
  const validationErrors = validationResult(req)
  if(!validationErrors.isEmpty()) return MakeResponse(res,101)
  
  //check user existance
  let {date,location} = req.body
  let {userId} = req.params
  try {
    let result = await UserModel.findById(userId).exec()
    //reject if user not existed
    if(result === null) return MakeResponse(res,103)
  } catch (error) {
    console.error("check user existance failed with error: ",error.message)
    return MakeResponse(res,999)
  }
  //create attack
  let Attack = new AttackModel({date,location,userId});
  let attackId
  try {
    let {_id} = await Attack.save()
    attackId = _id
  } catch (error) {
    let errorCode = (error.code === 11000) ? 202 : 999
    if(errorCode === 999) console.error("create attack failed with error: ",error.message)
    return MakeResponse(res,errorCode)
  }
  //add this attackId to user's "attacks" record for faster query
  try {
    let result = await UserModel.findByIdAndUpdate(userId,{$push:{attacks:attackId}})
    return MakeResponse(res)
  } catch (error) {
    console.error("update user attacks record failed with error: ",error.message)
    return MakeResponse(res,999)
  }
})


/**
 * 
 * @api {PUT} /api/user/:userId/attack/:attackId Update an attack of a user
 * @apiName UpdateAttack
 * @apiGroup User
 * @apiVersion  0.0.1
 * 
 * 
 * @apiParam  (Path Parameter) {String}     userId    unique userId.
 * @apiParam  (Path Parameter) {String}     attackId  unique attackId.
 * 
 * @apiParam  (Body Parameter) {Date}       date      the ISO8601 format of JS Date Object representing the date and time of the attack.
 * @apiParam  (Body Parameter) {Number=0,1} location  answer to the location question. 0 means outside, 1 means inside
 * 
 * @apiSuccess (Succeeded) {Number} errorCode   response error code, should be 0.
 * @apiSuccess (Succeeded) {String} msg         message to client, should be ''.
 * 
 * @apiError   (Failed) {Number} errorCode   response error code, should not be 0.
 * @apiError   (Failed) {String} msg         error message
 * 
 * @apiParamExample  {json} Request-Example:
 * {
 *     date : "2020-02-21T23:55:28.264Z",
 *     location : 0
 * }
 * 
 * @apiSuccessExample {json} Success-Response-Example:
 * {
 *     errorCode : 0,
 *     msg : ''
 * }
 * 
 * @apiErrorExample {json} Error-Response-Example:
 * {
 *   errorCode : 201,
 *   msg : "userId/attackId does not exist or not match"
 * }
 * 
 */
UserRouter.put('/:userId/attack/:attackId',[
  //date should be ISO8601 date
  check('date').notEmpty().isISO8601(),
  //location should be in [0,1] 0 means outside, 1 means inside
  check('location').notEmpty().isIn([0,1]),
  //userid should be valid mongoid
  check('userId').notEmpty().isMongoId(),
  //attackId should be valid mongoid
  check('attackId').notEmpty().isMongoId()
],async (req,res,next)=>{
  //check validation result
  const validationErrors = validationResult(req)
  if(!validationErrors.isEmpty()) return MakeResponse(res,101)

  //check user and attack existance
  let {date, location} = req.body
  let {userId, attackId} = req.params
  try {
    let result = await UserModel.findOne({_id:userId, attacks:attackId}).exec()
    if (result === null) return MakeResponse(res,201)
  } catch (error) {
    console.error("check user and attack existance failed with error: ",error.message)
    return MakeResponse(res,999)
  }
  
  //update the attack record
  try{
    let result = await AttackModel.findByIdAndUpdate(attackId,{date,location,userId}).exec()
    return MakeResponse(res)
  } catch (error){
    let errorCode = (error.code === 11000) ? 202 : 999
    if(errorCode === 999) console.error("update attack record failed with error: ",error.message)
    return MakeResponse(res,errorCode)
  }
})


/**
 * 
 * @api {DELETE} /api/user/:userId/attack/:attackId Delete an attack of a user
 * @apiName DeleteAttack
 * @apiGroup User
 * @apiVersion  0.0.1
 * 
 * @apiParam  (Path Parameter) {String}     userId    unique userId.
 * @apiParam  (Path Parameter) {String}     attackId  unique attackId.
 * 
 * @apiSuccess (Succeeded) {Number} errorCode   response error code, should be 0.
 * @apiSuccess (Succeeded) {String} msg         message to client, should be ''.
 * 
 * @apiError   (Failed) {Number} errorCode   response error code, should not be 0.
 * @apiError   (Failed) {String} msg         error message
 * 
 * @apiSuccessExample {json} Success-Response-Example:
 * {
 *     errorCode : 0,
 *     msg : ''
 * }
 * 
 * @apiErrorExample {json} Error-Response-Example:
 * {
 *   errorCode : 201,
 *   msg : "userId/attackId does not exist or not match"
 * }
 * 
 */
UserRouter.delete('/:userId/attack/:attackId',[
  //userid should be valid mongoid
  check('userId').notEmpty().isMongoId(),
  //attackId should be valid mongoid
  check('attackId').notEmpty().isMongoId()
], async (req,res,nest)=>{
  //check validation result
  const validationErrors = validationResult(req)
  if(!validationErrors.isEmpty()) return MakeResponse(res,101)

  //check user and attack existance
  let {userId, attackId} = req.params
  try {
    let result = await UserModel.findOne({_id:userId, attacks:attackId}).exec()
    if (result === null) return MakeResponse(res,201)
  } catch (error) {
    console.error("check user and attack existance failed with error: ",error.message)
    return MakeResponse(res,999)
  }

  //delete the attack record
  try {
    let result = await AttackModel.findByIdAndDelete(attackId).exec()
  } catch (error) {
    console.error("delete record failed with error: ",error.message)
    return MakeResponse(res,999)
  }
  //pull the attackId from user's attaks array
  try {
    let result = await UserModel.findByIdAndUpdate(userId,{$pull:{attacks:attackId}}).exec()
    return MakeResponse(res)
  } catch (error) {
    console.error("delete record from user's attacks failed with error: ",error.message)
    return MakeResponse(res,999)
  }
})

UserRouter.get('/:userId/attack',[],async (req,res,next)=>{
  //check validation result
  const validationErrors = validationResult(req)
  if(!validationErrors.isEmpty()) return MakeResponse(res,101)
  

})

module.exports = UserRouter
