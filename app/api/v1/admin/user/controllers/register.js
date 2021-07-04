const mongoose = require('mongoose');
const User = require('../model/user');
const types = require('../../../../../lib/errorTypes');
const Validators = require('../../../../../lib/validators');
const queries = require('../../../../../lib/commonQuerries');
const requiredPayLoad = ['firstName', 'lastName', 'email', 'password'];
const mailer = require('../../../../../lib/mailer');
const constantObj = require('../../../../../lib/constant');

const registerUser = async (req, res) => {
  console.log(req.body);
  for (let prop of requiredPayLoad) {
    if (req.body[prop] === null || req.body[prop] === undefined) {
      return res.customError(types.errorTypes.INPUT, 'Missing Required Fied : ' + prop)
    }
  }
  const valid = Validators.isValidEmail(req.body.email);
  if (!valid) {
    return res.customError(types.errorTypes.EMAIL, 'Passing Invalid Email Type');
  }
  const validPassword = Validators.isValidPassword(req.body.password);
  if (!validPassword) {
    return res.customError(types.errorTypes.EMAIL, 'Please Pass Valid Password!');
  };
  try {
    mailer.SendMail('obulesuf0008@gmail.com','Passing mail', '<b>Send Mail</b>',constantObj.gmailSMTPCredentials.username)
    
    try {
      const email = await queries.emailExist(User, req.body.email);
      if (email && email.data && email.data.email === req.body.email) {
        return res.customError(types.errorTypes.INPUT, "Email Already Existed");
      }
    } catch (error) {
      return res.customError(types.errorTypes.QUERY, constantObj.messages.downstream)
    }
    req.body.password = await queries.saltPassword(req.body.password)
    const registerResponse = await queries.insertIntoCollection(
      User,
      req.body
    );
    if (registerResponse.error) {
      return res.customError(types.errorTypes.INPUT, constantObj.messages.regFail);
    }
    parseResponse(req, res, registerResponse);
  } catch (error) {
    return res.customError(types.errorTypes.QUERY, constantObj.messages.downstream);
  }
};

/**
 * @description - Parse the Registration Response
 * @param { Request} req - request of Parse Response
 * @param {Response} res - send the Response
 * @param {Object} registerResponse - contains info of registered user
 */
const parseResponse = async (req, res, registerResponse) => {
  let finalObj = {};
  try {
    if (registerResponse.status) {
      finalObj.flowStatus = constantObj.statusMessage.SUCCESS
      finalObj.flowStatusMessage = `Hii ${registerResponse.data.firstName} ${constantObj.messages.sucessReg}`
    } else {
      finalObj.flowStatus = constantObj.statusMessage.FAILURE;
      finalObj.flowStatusMessage = `Hii ${constantObj.messages.regFail}`;
    };
    return res.customResponse(finalObj, false);
  } catch (error) {
    return res.customError(types.errorTypes.PARSE, constantObj.messages.downstream)
  }
}



module.exports = {
  registerUser
}