const codeMsgMapping = {
  0:'',
  101: 'input validation failed',
  102: 'username or UUID exist',
  103: 'userId does not exist',
  201: 'userId/attackId does not exist or not match',
  202: 'the attack at that time was already reported',
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

module.exports = {MakeResponse}