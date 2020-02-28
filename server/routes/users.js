const express = require('express')
const UserRouter = express.Router()
const {check, query} = require('express-validator')
const {UserModel, AttackModel} = require("../models")
const {MakeResponse, checkValidationResult, checkAuth} = require('../utils')
const _ = require('lodash')


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
  check('uuid').notEmpty().isString(),
  //check validation result
  checkValidationResult
], async (req, res, next) => {
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
    req.session.level = 'user'
    req.session.userId = _id
    return MakeResponse(res,0,{userId:_id})
  } catch (error) {
    console.error("create user failed with error: ",error.message)
    return MakeResponse(res,999)
  }
})


/**
 * 
 * @api {POST} /api/user/:userId/session Create new session
 * @apiName CreatSession
 * @apiGroup User
 * @apiVersion  0.0.1
 * 
 * @apiParam  (Path Parameter) {MongoId}  userId    user's unique userId
 * @apiParam  (Body Parameter) {String}   username  user's username.
 * @apiParam  (Body Parameter) {String}   uuid      uuid of user's device.
 * 
 * @apiSuccess (Succeeded) {Number} errorCode   response error code, should be 0.
 * @apiSuccess (Succeeded) {String} msg         message to client, should be ''.
 * 
 * @apiError   (Failed) {HTTP-StatusCode} statusCode  http status code.
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
 *     msg : ''
 * }
 * 
 * @apiErrorExample {HTTP-StatusCode} Error-Response-Example:
 * 401 Unauthorized
 * 
 */
UserRouter.post('/:userId/session',[
  //userId should be mongoId
  check('userId').notEmpty().isMongoId(),
  //username should be string
  check('username').notEmpty().isString(),
  //uuid should be string
  check('uuid').notEmpty().isString(),
  //check validation result
  checkValidationResult
], async(req, res, next) =>{
  let {userId} = req.params
  let {username,uuid} = req.body
  //check user identification
  try {
    let result = await UserModel.findById(userId).exec()
    if (result === null || result.username !== username || result.uuid !== uuid) return res.sendStatus(401)
  } catch (error) {
    console.error('user authorization failed with error message: ',error.message)
    return MakeResponse(res,999)
  }
  //set the session identifiers for future auth check
  req.session.level = 'user'
  req.session.userId = userId
  return MakeResponse(res,0)
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
 *     msg : {
 *         attackId: "5e50569d9c01c65ba494ee1d"
 *     }
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
  //check auth
  checkAuth,
  //date should be ISO8601 date
  check('date').notEmpty().isISO8601(),
  //location should be in [0,1] 0 means outside, 1 means inside
  check('location').notEmpty().isIn([0,1]),
  //userid should be valid mongoid
  check('userId').notEmpty().isMongoId(),
  //check validation result
  checkValidationResult
],async (req,res,nect)=>{
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
    return MakeResponse(res,0,{attackId})
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
  //check auth
  checkAuth,
  //date should be ISO8601 date
  check('date').notEmpty().isISO8601(),
  //location should be in [0,1] 0 means outside, 1 means inside
  check('location').notEmpty().isIn([0,1]),
  //userid should be valid mongoid
  check('userId').notEmpty().isMongoId(),
  //attackId should be valid mongoid
  check('attackId').notEmpty().isMongoId(),
  //check validation result
  checkValidationResult
],async (req,res,next)=>{
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
  //check auth
  checkAuth,
  //userid should be valid mongoid
  check('userId').notEmpty().isMongoId(),
  //attackId should be valid mongoid
  check('attackId').notEmpty().isMongoId(),
  //check validation result
  checkValidationResult
], async (req,res,nest)=>{
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

/**
 * 
 * @api {GET} /api/user/:userId/attack Search one's attack records
 * @apiName SearchUserAttack
 * @apiGroup User
 * @apiVersion  0.0.1
 * 
 * @apiParam  (Path Parameter)  {String}                      userId    unique userId.
 * @apiParam  (Query Parameter) {String}                      [from]    search attacks since this date (included).
 * @apiParam  (Query Parameter) {String}                      [to]      search attacks until this date (included).
 * @apiParam  (Query Parameter) {String="users","attacks"}    [source]  search collection source. default is "attacks" for a complete result but may be slower. "users" collection should be faster(not tested yet) but only remain records since 7 days before today.
 * 
 * @apiSuccess (Succeeded) {Number}     errorCode     response error code, should be 0.
 * @apiSuccess (Succeeded) {Array}      msg           array of result attacks.
 * @apiSuccess (Succeeded) {MongoId}    msg._id       objectId of the attack record.
 * @apiSuccess (Succeeded) {Date}       msg.date      the date that attack happened in ISO8601 format.
 * @apiSuccess (Succeeded) {Number=0,1} msg.location  the location when the attack happened. 0 means outside, 1 means inside
 * 
 * @apiError   (Failed) {Number} errorCode   response error code, should not be 0.
 * @apiError   (Failed) {String} msg         error message
 * 
 * @apiSuccessExample {json} Success-Response-Example:
 * {
 *     errorCode : 0,
 *     msg : [
 *        {
 *          _id: "5e50b83b51c16451e0f56322",
 *          date: "2020-02-21T23:55:28.264Z",
 *          location: 1
 *        }
 *      ]
 * }
 * 
 * @apiErrorExample {json} Error-Response-Example:
 * {
 *   errorCode : 301,
 *   msg : "invalid search source"
 * }
 * 
 */
UserRouter.get('/:userId/attack',[
  //check auth first
  checkAuth,
  //userId should be valid mongoid
  check('userId').notEmpty().isMongoId(),
  //from should be valid date but not necessary
  query('from').optional().isISO8601(),
  //to shoud be valid date but noe necessary
  query('to').optional().isISO8601(),
  //check validation result
  checkValidationResult
],async (req,res,next)=>{
  let {userId} = req.params
  //construct search engine option object
  let searchEngineOption = {}
  //append options to the option obejct if exist
  if(req.query.from) searchEngineOption.from = req.query.from
  if(req.query.to) searchEngineOption.to = req.query.to
  if(req.query.source) searchEngineOption.source = req.query.source
  //don't need to check user existance since the query result will be null if userId doesn't exist
  try {
    let result = await AttackSearchEngine(userId,searchEngineOption)
    return MakeResponse(res,0,result)
  } catch (error) {
    if(error.message.includes('invalid source:')) return MakeResponse(res,301)
    console.error("query attack failed with error: ",error.message)
    return MakeResponse(res,999)
  }
})

module.exports = UserRouter

/**
 * 
 * @param {MongoId} userId  objectId of the user
 * @param {Object}  option  search engine configuration
 * @param {Date}    [option.from] search record since this date (included)
 * @param {Date}    [option.to]   search record until this date (included)
 * @param {String}  [option.source] search collection source, "users" or "attacks"
 */
function AttackSearchEngine(userId,option){
  //check search source
  //default search source will be "attacks" collection
  //throw Error if source is not in ["attacks","users"]
  let source = (option.source) ? (["attacks","users"].includes(option.source) ? option.source : false) : "attacks"
  if(!source) throw Error("invalid source:"+option.source)
  
  //construct search condition object
  let searchCondition = {userId}
  //construct date limitation object
  let dateLimitation = {}
  
  //check if there is any limitation on date
  if(option.from) dateLimitation.$gte = option.from
  if(option.to) dateLimitation.$lte = option.to
  
  //if there is limitation, append the limitation to the search condition object
  if(!_.isEmpty(dateLimitation))  searchCondition.date=dateLimitation

  //return the rsult Promise
  if(source === 'attacks'){
    return AttackModel.find(searchCondition)
                      .select({_id:1, date:1, location:1})
                      .exec()
  }else{
    return UserModel.findById(userId)
                    .select('attacks')
                    .populate({
                      path: 'attacks',
                      select: {_id:1, date:1, location:1},
                      match: {date: searchCondition.date ? searchCondition.date : {}}
                    })
                    .exec()
                    .then(r=>Promise.resolve(r.attacks)) //post process to make sure the outputs follow the same format
  }
}
