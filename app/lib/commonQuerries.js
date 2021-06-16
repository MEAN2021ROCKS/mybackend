const bcrypt = require('bcryptjs'),
  salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const constantObj = require('./constant');

const saltPassword = async (password) => {
  const salted = bcrypt.hashSync(password, salt);
  return salted;
}

/**
 * @description - 
 * @param {String} password - 
 * @returns {boolean} -
 */
const confirmPassword = function confirmPassword(password, userPassword) {
  return new Promise(function (resolve, reject) {
    try {
      let tempObj ={
        status: false
      }
      if (!password || !userPassword) {
        tempObj.error = 'Password is Required'
        return reject(tempObj);      
      }
     const confirm = bcrypt.compareSync(password,userPassword);
     tempObj.status = true;
     tempObj.confirm = confirm;
     return resolve(tempObj);
    } catch (error) {
      console.log(error);
    }
  });
};

const save = async (table, data) => {
  if (!data) {
    return 'Requested Data Missing!'
  }
  if (!table) {
    return 'Unable to Save the Record'
  }
  new table().save(data)
}

const insertIntoCollection = function InsertIntoCollection(model, obj) {
  return new Promise(function (resolve, reject) {
    new model(obj).save(function (err, userInfo) {
      let tempObj = {
        status: false
      }
      if (err) {
        tempObj.error = err;
        reject(tempObj);
      } else {
        tempObj.status = true;
        tempObj.data = userInfo;
        resolve(tempObj);
      }
    });
  })
}
const emailExist = function emailExist(model, obj) {
  return new Promise(function (resolve, reject) {
    model.findOne({ email: obj }).exec(function (err, userData) {
      let tempObj = {
        status : false
      }
      if (err) {
        tempObj.error = err;
        reject(tempObj);
      } else {
        tempObj.status = true;
        tempObj.data = userData;
        resolve(tempObj);
      }
    });
  })
};

const findOne = function findOne(model, obj) {
  return new Promise(function (resolve, reject) {
    model.findOne(obj).exec(function (err, userData) {
      let tempObj = {
        status : false
      }
      if (err) {
        tempObj.error = err;
        reject(tempObj);
      } else {
        tempObj.status = true;
        tempObj.data = userData;
        resolve(tempObj);
      }
    });
  })
};

const generateToken = async (data = {}) => {
  return new Promise((resolve, reject) => {
    try {
      let tempObject = {
        status: false
      }
      if (!Object.keys(data).length) {
        object.error = 'Please Pass User data';
        return reject(object);
      }
      const token = jwt.sign(data, constantObj.Private_Secret, { expiresIn: '1h' })
      if (!token) {
        tempObject.error = 'Token Not Generated'
        return reject(object);
      }
      tempObject.status = true
      tempObject.token = token;
      return resolve(tempObject);
    } catch (error) {
      return reject(error);
    }
  })
}

module.exports = {
  saltPassword,
  confirmPassword,
  save,
  insertIntoCollection,
  emailExist,
  generateToken,
  findOne
};