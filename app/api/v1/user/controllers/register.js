const mongoose = require('mongoose');
const User = require('../model/user');
const types = require('../../../../lib/errorTypes');
const Validators = require('../../../../lib/validators');
const queries = require('../../../../lib/commonQuerries');
const requiredPayLoad = ['firstName', 'lastName', 'email', 'password']

const registerUser = async (req, res) => {
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
  

   req.body.password = await queries.saltPassword(req.body.password)
  console.log(req.body);
  let user = new User(req.body);
  user.save()
  // const data = await queries.insertIntoCollection(
  //   User,
  //   req.body
  // );
  return res.customResponse(salt)
};



module.exports = {
  registerUser
}