const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'jusu_el_pastas@gmail.com',
    pass: 'jusu_slaptazodis'
  }
});

const mailOptions = {
  from: 'jusu_el_pastas@gmail.com',
  to: 'gavejo_el_pastas@example.com',
  subject: 'Laiško tema',
  text: 'Štai laiško tekstas.'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Laiškas išsiųstas: ' + info.response);
  }
});