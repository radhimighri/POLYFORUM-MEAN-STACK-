var ModelStudent  =require("../Modele/StudentModel");
const express=require("express");
var jwt =require("jsonwebtoken");
const router=express.Router();
var passwordHash = require('password-hash');
var fs = require ("fs");
const multer = require('multer');
const upload = multer({dest:__dirname + '/../src/assets/Uploads/'});

router.post('/signUp',upload.single('photo'),function(req,res){
  ModelStudent.findOne({Mail: req.body.Mail}, function (err,data) {
    if (data == null) {
      const file = __dirname + '/../src/assets/Uploads/images/' + req.file.originalname;
      fs.readFile(req.file.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
          if (err)
            res.json({INFO: err});
          else {
            ModelStudent({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              Date_Nais: req.body.Date_Nais,
              Sexe: req.body.Sexe,
              Pays: req.body.Pays,
              Tel: req.body.Tel,
              Group: req.body.Group,
              Mail: req.body.Mail,
              password: req.body.password,
              matricule: req.body.matricule,
              photo: req.file.originalname,
              CIN: req.body.CIN,
            }).save(function (err) {
              if (err)
                res.send({status: 'Erroor','INFO':' register failed'});
              else
                res.send({status:'Well',INFO :'Well register done'});
            })
          }
        });
      });
    } else res.send({'status': 'error2','INFO':'mail already in use'});
  })

  });
router.post("/signIn", function (req, res) {
  ModelStudent.findOne({Mail: req.body.Mail}, function (err,userInfo) {
      if (userInfo != null && req.body.Mail == userInfo.Mail) {
        if (userInfo.confirme == true){
          var testpass = passwordHash.verify(req.body.password, userInfo.password);
          if (testpass == true) {
            var token = jwt.sign({id: userInfo._id}, req.app.get("secretKey"), {expiresIn: '1h'});
            res.json({status:'LoggedIn',INFO: "YOU HAVE BEEN SUCCESSFULLY LOGGED IN!", data: {user: userInfo, token: token}});
          }
          else
            res.send({status: 'WrongPW','INFO': 'WRONG PASSWORD!'});
        }   //const token = jwt.sign({id: userInfo._id}, req.app.get("secretKey"), {expiresIn: '1h'});
        else
          res.send({status:'UnconfirmedAcc','INFO':'ACCOUNT NOT CONFIRMED YET!'});
      }
      else
        res.send({status:'WrongMail','INFO':'WRONG EMAIL!'});

  });
});
router.put('/confirmRegistration/:id',function (req,res) {
  ModelStudent.findOne({_id : req.params.id}, function(err,data) {
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

      from: '"Ecole Polytechnique Sousse" <polytechsousse2020@gmail.com>', // sender address
      to: data.Mail, // list of receivers
      subject: "Approuvation du compte",
      text: "Votre compte a été approuvé par l'administration, cliquez sur le lien ci-dessous pour vous se connecter\n Service EPS"
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      res.send('E-Mail was sent successfully:\nidMail : ' + info.messageId + '\nDestination : ' + mailOptions.to + '\nSubject : ' + mailOptions.subject + '\nText : ' + mailOptions.text + '\n===> and here is the response :' + info.response);
    });
  });
  ModelStudent.updateOne({_id : req.params.id},
    {
      confirme:true,
    }
    , function(err){
      if(err)
        res.send({'status':'Error' +err});
      else
        res.send({'status':'modifié avec succées'})
    })
});
router.delete('/deleteStudent/:id',function (req,res) {

  ModelStudent.deleteOne({_id : req.params.id}, function(err){

    if(err){
      res.send({'status':'Erreur' +err})
    }
    else
    {
      res.send({'status':'supprimé avec succées'})
    }

  })

});
router.get('/profilView/:id',function (req,res) {
  ModelStudent.findOne({_id : req.params.id})
    .populate('Group')
    .exec(function(err,data){
      if (err)
        res.send(err);
      else
        res.send(data);
    })

  });
router.get('/selectAllStudents',function (req,res) {
  ModelStudent.find({confirme: 'true'})
    .populate('Group')
    .exec(function (err,data) {
    if(err){
      console.log("erreur ; "+err)
    }else {
      res.send(data)
    }

  })

});
router.get('/ShowUnconfirmedUsers',function(req,res){
  ModelStudent.find({confirme : 'false'})
    .populate('Group')
    .exec(function (err,data) {
      if(err){
        console.log("erreur ; "+err)
      }else {
        res.send(data)
      }
  });
});
router.put('/updateById/:id',function (req,res) {
  ModelStudent.updateOne({_id : req.params.id},
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      Date_Nais: req.body.Date_Nais,
      Sexe: req.body.Sexe,
      Pays: req.body.Pays,
      Tel: req.body.Tel,
      Mail: req.body.Mail,
      password: passwordHash.generate(req.body.password),
      photo: req.body.photo,
      nomGroupe: req.body.nomGroupe,
      matricule : req.body.matricule,
      CIN : req.body.CIN,
    }
    , function(err){

      if(err){
        res.send({'status':'Error' +err})
      }
      else
      {
        res.send({'status':'modifié avec succées'})
      }

    })

});
// router.post('/UploadUserImage',upload.single('photo'),function(req,res){
//   const file = __dirname + '/Uploads/images/' + req.file.originalname;
//   fs.readFile(req.file.path,function(err,data){
//     fs.writeFile(file,data,function(err){
//       if(err)
//         res.json({INFO: err});
//       else
//         res.json({INFO:'Your file has been successfully uploaded !',filename: req.file.originalname});
//     });
//   });
// })

// router.put('/ChangePassword/:id',function (req,res) {
//
//   ModelStudent.updateOne({_id : req.params.id},
//     {
//
//       password: passwordHash.generate(req.body.password),
//
//     }
//     , function(err){
//
//       if(err){
//         res.send({'status':'Error' +err})
//       }
//       else
//       {
//         res.send({'status':'modifié avec succées'})
//       }
//
//     })
//
// })
//
// router.put('/ChangePhoto/:id',function (req,res) {
//
//   ModelStudent.updateOne({_id : req.params.id},
//     {
//       photo: req.body.photo,
//     }
//     , function(err){
//
//       if(err){
//         res.send({'status':'Error' +err})
//       }
//       else
//       {
//         res.send({'status':'modifié avec succées'})
//       }
//
//     })
//
// })
// router.get('/SelectByID',function(req,res){
//   ModelStudent.findOne({})
//     .populate('nomGroupe',['libelleGroup'])
//     .exec(function(err,data){
//     if(err)
//       res.send({err});
//     else
//       res.send(data.nomGroupe.libelleGroup);
//   })
//
// });

/*router.get('/selectByName/:firstName',function (req,res) {
  ModelStudent.findOne({firstName : req.params.firstName},function (err,data) {
      if(err){
        console.log("Not found ,"+err)

      }

      res.send(data)
    })

  })*/

// router.put('/accessBlock/:id',function (req,res) {
//
//   ModelStudent.updateOne({_id : req.params.id},
//     {
//       confirme:false,
//     }
//     , function(err){
//
//       if(err){
//         res.send({'status':'Error' +err})
//       }
//       else
//       {
//         res.send({'status':'modifié avec succées'})
//       }
//
//     })
//
// })
// router.post("/signIn", function (req, res) {
//   console.log("Authentification... ")
//   ModelStudent.findOne({Mail: req.body.Mail}, function (err, userInfo) {
//
//     if (err)
//     {console.log(err);}
//     else {
//       if (userInfo!=null) {
//         if (req.body.Mail == userInfo.Mail) {
//           if (userInfo.confirme == true) {
//
//             console.log(req.body.password);
//             console.log(userInfo.password);
//             console.log(passwordHash.verify(req.body.password, userInfo.password));
//
//             if (passwordHash.verify(req.body.password, userInfo.password)) {
//
//               //if (bcrypt.compare(req.body.password,userInfo.password)==true) {
//               //if (req.body.password == userInfo.password) {
//               const token = jwt.sign({id: userInfo._id}, req.app.get("secretKey"), {expiresIn: '2h'});
//               res.json({status: "succes", msg: "user found", data: {user: userInfo, token: token}});
//             } else {
//               res.json({status: "erreur", msg: "invalid password", data: null});
//             }
//           } else {
//             res.json({status: "erreur", msg: "your account is not activated yet", data: null});
//           }
//         }
//         //else { res.json({status: "erreur", msg: "your account is not activated yet", data: null});}
//
//       }
//       else
//         res.send("invalid email");
//
//     }
//
//   });
//
// })

module.exports=router;
