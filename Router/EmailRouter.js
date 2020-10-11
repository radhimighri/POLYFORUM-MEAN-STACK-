var ModelMail =require("../Modele/EmailModel");
const express=require("express");
const router=express.Router();
nodeMailer = require('nodemailer'),

router.post('/send-email', function (req, res) {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'polytechsousse2020@gmail.com',
      pass: 'polytech2020'
    }
  });
  let mailOptions = {

    from: '"Abdrahman Mahfoudhi" <xx@gmail.com>', // sender address
    to: req.body.dest, // list of receivers
    subject: req.body.subject,
    text: req.body.texte, // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    //console.log('Message was sent successfully:\n idMessage: %s \n Destination: %s \n Subject: %s \n Text: %s \n ===> and here is the response : %s', info.messageId, mailOptions.to, mailOptions.subject, mailOptions.text, info.response);
    //res.render('index');
    //res.send(info);
    res.send('E-Mail was sent successfully:\nidMail : '+info.messageId+ '\nDestination : '+mailOptions.to+ '\nSubject : '+mailOptions.subject +'\nText : '+mailOptions.text+'\n===> and here is the response :' + info.response);


  });
})



 module.exports=router;
