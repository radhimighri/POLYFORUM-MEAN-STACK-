var ModelProf  =require("../Modele/ProfModel");
const express=require("express");
var jwt =require("jsonwebtoken")
const router=express.Router();
let passwordHash = require('password-hash');
var fs = require ("fs");
const multer = require('multer');
const upload = multer({dest:__dirname + '/../src/assets/Uploads/'});

router.post('/signUp',upload.single('photo'),function(req,res){
  ModelProf.findOne({Mail: req.body.Mail}, function (err,data) {
    if (data == null) {
      const file = __dirname + '/../src/assets/Uploads/images/' + req.file.originalname;
      fs.readFile(req.file.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
          if (err)
            res.json({INFO: err});
          else {
            ModelProf({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              Date_Nais: req.body.Date_Nais,
              Sexe: req.body.Sexe,
              Pays: req.body.Pays,
              Tel: req.body.Tel,
              nomDepartement: req.body.nomDepartement,
              Mail: req.body.Mail,
              password: req.body.password,
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

router.put('/confirmRegistration/:id',function (req,res) {
  ModelProf.findOne({_id : req.params.id}, function(err,data) {
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
      text: 'Your account has been confirmed'// plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      res.send('E-Mail was sent successfully:\nidMail : ' + info.messageId + '\nDestination : ' + mailOptions.to + '\nSubject : ' + mailOptions.subject + '\nText : ' + mailOptions.text + '\n===> and here is the response :' + info.response);
    });
  });
  ModelProf.updateOne({_id : req.params.id},
    {
      confirme:true,
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

router.post("/signIn", function (req, res) {
  ModelProf.findOne({Mail: req.body.Mail}, function (err,userInfo) {
    if (userInfo != null && req.body.Mail == userInfo.Mail) {
      if (userInfo.confirme == true){
        var testpass = passwordHash.verify(req.body.password, userInfo.password);
        if (testpass == true) {
          var token = jwt.sign({id: userInfo._id}, req.app.get("secretKey"), {expiresIn: '1h'});
          res.json({status:'LoggedInProf',INFO: "YOU HAVE BEEN SUCCESSFULLY LOGGED IN!", data: {user: userInfo, token: token}});
        }
        else
          res.send({status: 'WrongPWProf','INFO': 'WRONG PASSWORD!'});
      }   //const token = jwt.sign({id: userInfo._id}, req.app.get("secretKey"), {expiresIn: '1h'});
      else
        res.send({status:'UnconfirmedAccProf','INFO':'ACCOUNT NOT CONFIRMED YET!'});
    }
    else
      res.send({status:'WrongMailProf','INFO':'WRONG EMAIL!'});

  });
});

router.delete('/deleteProf/:id',function (req,res) {
  ModelProf.deleteOne({_id : req.params.id}, function(err){

    if(err){
      res.send({'statu':'Erreur' +err})
    }
    else
    {
      res.send({'statu':'supprimé avec succées'})
    }

  })

})

router.put('/accessBlock/:id',function (req,res) {

  ModelProf.updateOne({_id : req.params.id},
    {
      /*firstName: req.body.firstName,
      lastName: req.body.lastName,
      Date_Nais: req.body.Date_Nais,
      Sexe: req.body.Sexe,
      Address: req.body.Addresse,
      Tel: req.body.Tel,
      Mail: req.body.Mail,
      password: passwordHash.generate(req.body.password),
      photo: req.body.photo,
      nomDepartement: req.body.nomDepartement,*/
      confirme:false,
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

})

router.get('/profilView/:id',function (req,res) {
  ModelProf.findOne({_id : req.params.id})
    .populate('nomDepartement')
    .exec(function(err,data){
      if(err)
        res.send(err);
      else
        res.send(data);
    })


})

router.put('/ChangePassword/:id',function (req,res) {

  ModelProf.updateOne({_id : req.params.id},
    {

      password: passwordHash.generate(req.body.password),

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

})

// router.put('/ChangePhoto/:id',function (req,res) {
//
//   ModelProf.updateOne({_id : req.params.id},
//     {
//
//       photo: req.body.photo,
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

router.post('/UploadUserImage',upload.single('photo'),function(req,res){
  const file = __dirname + '/../src/assets/Uploads/images/' + req.file.originalname;
  fs.readFile(req.file.path,function(err,data){
    fs.writeFile(file,data,function(err){
      if(err)
        res.json({INFO: err});
      else
        res.json({INFO:'Your file has been successfully uploaded !',filename: req.file.originalname, path: req.file.path});
    });
  });
});

router.get('/selectAllProfs',function (req,res) {
    ModelProf.find({confirme : 'true'})
      .populate('nomDepartement')
      .exec(function(err,data){
        if(err)
          res.send(err);
        else
          res.send(data);
      })


  });

router.get('/ShowUnconfirmedUsers',function(req,res){
  ModelProf.find({confirme : 'false'})
    .populate('nomDepartement')
    .exec(function (err,data) {
      if(err){
        console.log("erreur ; "+err)
      }else {
        res.send(data)
      }
    });
});


router.put('/updateById/:id',function (req,res) {
  ModelProf.updateOne({_id : req.params.id},
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      Date_Nais: req.body.Date_Nais,
      Mail: req.body.Mail,
      password: passwordHash.generate(req.body.password),
      photo: req.body.photo,
      nomDepartement: req.body.nomDepartement,
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

/*router.post("/signIn", function (req, res) {
  console.log("Authentification... ")
  ModelProf.findOne({Mail: req.body.Mail}, function (err, userInfo) {

    if (err)
    {console.log(err);}
    else {
      if (userInfo!=null) {
        if (req.body.Mail == userInfo.Mail) {
          console.log(req.body.password);
          console.log(userInfo.password);
          console.log(passwordHash.verify(req.body.password, userInfo.password));

          if (passwordHash.verify(req.body.password,userInfo.password)) {

            //if (bcrypt.compare(req.body.password,userInfo.password)==true) {
            //if (req.body.password == userInfo.password) {
            const token = jwt.sign({id: userInfo._id}, req.app.get("secretKey"), {expiresIn: '2h'});
            res.json({status: "succes", msg: "user found", data: {user: userInfo, token: token}});
          } else {
            res.json({status: "erreur", msg: "invalid password", data: null});
          }
        } else {
          res.json({status: "erreur", msg: "Not found", data: null});
        }
      }
      else
        res.send("invalid email");

    }

  });

})*/

/*router.get('/select',function (req,res) {
  ModelProf.find({},function (err,data) {
    if(err){
      console.log("erreur ; "+err)
    }
    res.send(data)
  })

})*/
/*router.get('/selectByName/:firstName',function (req,res) {
  ModelProf.findOne({firstName : req.params.firstName},function (err,data) {
      if(err){
        console.log("Not found ; "+err)
      }
      res.send(data)
    })

  })*/


module.exports=router;
