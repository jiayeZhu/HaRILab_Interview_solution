const {validationResult} = require('express-validator')

const codeMsgMapping = {
  0:'',
  101: 'input validation failed',
  102: 'username or UUID exist',
  103: 'userId does not exist',
  201: 'userId/attackId does not exist or not match',
  202: 'the attack at that time was already reported',
  301: 'invalid search source',
  999: 'Internal error occured'
}
/**
 * 
 * @param {Response} res Express response object
 * @param {Number} errorCode Error code
 * @param {Object} data Data for client
 */
function MakeResponse(res,errorCode=0,data=null){
  let msg = (errorCode === 0 && data) ? data : codeMsgMapping[errorCode]
  return res.json({errorCode,msg})
}

// middleware for checking validation result
function checkValidationResult (req,res,next){
  const validationErrors = validationResult(req)
  if(!validationErrors.isEmpty()) return MakeResponse(res,101)
  next()
}
// middleware for checking auth level.
// user could only CRUD on his/her own data.
// clinician could CRUD on all data.
function checkAuth(req,res,next){
  //check if it's a authed request
  if(!req.session.level) return res.sendStatus(401)
  //if it's user, check the userId in session and the userId in path parameter, they should match
  if(req.session.level === 'user'){
    if (req.session.userId !== req.params.userId) return res.sendStatus(403)
    else next()
    return
  } 
  //if it's clinician, pass
  if(req.session.level === 'clinician') next()
  else {
    console.error('unknown auth level: ',req.session.level,' ,failed in checkAuth')
    return MakeResponse(res,999)
  }
}

module.exports = {MakeResponse,checkValidationResult,checkAuth}