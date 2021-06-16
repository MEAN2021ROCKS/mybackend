const messages = {
  emailExists: "Email Already Existed!",
  passwordInValid: "You are Passing Invalid Password!",
  downstream: 'Unable to Make Sucessfull call',
  regFail: 'Registration Failed, Try again',
  sucessReg: 'Your Account Successfully created',
  emaiNnotFound: 'Your Entered Email is Not Existed, Please Enter Valid Email',
  passwordNotFound: 'You are Entered wrong Password'
};

const  statusMessage = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
}
const gmailSMTPCredentials = {
  "service": "gmail",
  "host": "smtp.gmail.com",
  "username": "adi.ajs50@gmail.com",
  "password": "LikhitH4050",
  "port": 587
}

const Private_Secret = 'ADI@vani$KiShOrE%MEAN*PROJECT';

module.exports = {
  messages,
  gmailSMTPCredentials,
  statusMessage,
  Private_Secret
}