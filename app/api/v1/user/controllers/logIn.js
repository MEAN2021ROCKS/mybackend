const User = require('../model/user');
const constObj = require('../../../../lib/constant');
const types = require('../../../../lib/errorTypes');
const Validators = require('../../../../lib/validators');
const queries = require('../../../../lib/commonQuerries');
const { use } = require('../routes/user');
const requiredPayLoad = ['email', 'password'];

const loginUser = async (req, res) => {
  try {
    for (const prop of requiredPayLoad) {
      if (req.body[prop] === null || req.body[prop] === undefined) {
        return res.customError(types.errorTypes.INPUT, `Missing Required field ${prop}`);
      }
      const findObj = {email: req.body.email}
      try {
        const user = await queries.findOne(
          User,
          findObj
        )
        if (!user.status && user.error) {
          return res.customError(types.errorTypes.DOWNSTREAM, constObj.messages.downstream);         
        }
        if (user.data === null) {
          return res.customError(types.errorTypes.NOTFOUND, constObj.messages.emaiNnotFound);
        }

        const passwordCheck = await queries.confirmPassword(req.body.password, user.data.password);
        if (!passwordCheck.status) {
          return res.customError(types.errorTypes.PASSWORD, `Hey ${user.data.firstName} ${constObj.messages.passwordInValid}`);
        }
        if (!passwordCheck.confirm && passwordCheck.status) {
          return res.customError(types.errorTypes.PASSWORD, `Hey ${user.data.firstName} ${constObj.messages.passwordInValid}`)          
        }

        const tokenObject = {
          _id: user.data._id,
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          user: user.data.user
        }
        const token = await queries.generateToken(tokenObject);
        if (!token.status) {
          return res.customError(types.errorTypes.PASSWORD, `Hey ${user.data.firstName} ${constObj.messages.passwordInValid}`)          
        }
       return parseResponse(req, res, user.data, "SUCCESS", token.token)        
      } catch (error) {        
      }
    }
  } catch (error) {
  }
}
/**
 * @description - Parse the Registration Response
 * @param { Request} req - request of Parse Response
 * @param {Response} res - send the Response
 * @param {Object} registerResponse - contains info of registered user
 */
 const parseResponse = async (req, res, user, status, token) => {
  let finalObj = {};
  try {
    if (user && token && status === 'SUCCESS') {
      finalObj.flowStatus = constObj.statusMessage.SUCCESS
      finalObj.flowStatusMessage = 'Login Successfull';
      finalObj.result = {};
      finalObj.result.id = user._id;
      finalObj.result.firstName = user.firstName;
      finalObj.result.lastName = user.lastName;
      finalObj.result.user = user.user;
      finalObj.result.token = token;
      return res.customResponse(finalObj, false);
    } else {
      finalObj.flowStatus = constObj.statusMessage.FAILURE;
      finalObj.flowStatusMessage = "";
    };    
  } catch (error) {
    return res.customError(types.errorTypes.PARSE, constantObj.messages.downstream)
  }
}


module.exports = { loginUser };
