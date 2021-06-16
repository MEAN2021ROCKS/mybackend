'use --unhandled-rejections=strict'
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const smtoTransport = require('nodemailer-smtp-transport');
const constantObj = require('./constant');

function SendMail(to, subject, html, from = constantObj.gmailSMTPCredentials.username) {
  return new Promise((resolve, reject) => {
    try {
      if (!to || !subject || !html)
        return reject('Please pass ' + (!to ? 'to' : (!subject ? 'subject' : 'body')));

      const transporter = nodemailer.createTransport({
        service: constantObj.gmailSMTPCredentials.service,
        host: 'smtp.gmail.com',
        port: 465,       
        auth: {            
          user: constantObj.gmailSMTPCredentials.username,
          pass: constantObj.gmailSMTPCredentials.password
        },
                
        // tls: {
        //   rejectUnauthorized: false
        // },
      });

      const mailOptions = {
        from: from, // sender address 
        to: to, // list of receivers 
        subject: subject, // Subject line 
        text: html // html body 
      };

      transporter.sendMail(mailOptions, function (error, info) {
        console.log('info', info);
        if (error) {
          console.log('error', error);
          return reject(error.message);
        }
        return resolve('Email sent successfully to ' + to);
      });

    } catch (error) {

      console.log({ error });
      return reject(error.message);
    }
  })
}

module.exports = {
  SendMail
};