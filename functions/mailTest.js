const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'johnouk79@gmail.com',
    pass: 'rhtnneqghwneywwi'
  }
});
let mailTo = 'john.obrien@moneyplus.com'
let mailSubject = 'The Information you requested from Battle-Bot!'
let mailContent = 'That Was Easy!!'
const mailOptions = {
  from: 'johnouk79@gmail.com',
  to: mailTo,
  subject: mailSubject,
  text: mailContent
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
