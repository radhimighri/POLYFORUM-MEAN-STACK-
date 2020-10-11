const ModelAdmin  =require("../Modele/AdminModel");
const express=require("express");
const router=express.Router();
let jwt =require("jsonwebtoken");
var mongoose = require('mongoose');
var db = mongoose.connection;
let passwordHash = require('password-hash');
var fs = require('file-system');
var multer  = require('multer');
var upload = multer({ dest: '/../src/assets/Uploads/' });
nodeMailer = require('nodemailer');



router.post('/register',function(req,res){

   ModelAdmin({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    Date_Nais: req.body.Date_Nais,
    Sexe: req.body.Sexe,
    Pays: req.body.Pays,
    Tel: req.body.Tel,
    Mail: req.body.Mail,
     password: req.body.password,
     CIN: req.body.CIN,

  }).save(function (err) {
    if(err){
      res.send({'status':'Error register failed'+err})
    }
    else
    {
      res.send({'status':'Well register done'})
    }

  })});

router.post("/signIn", function (req, res) {
  ModelAdmin.findOne({Mail: req.body.Mail}, function (err,userInfo) {
    if (userInfo != null && req.body.Mail === userInfo.Mail) {
      if (userInfo.confirme === true){
        var testpass = passwordHash.verify(req.body.password, userInfo.password);
        if (testpass === true) {
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

router.get('/profilView/:id',function (req,res) {
  ModelAdmin.findOne({_id : req.params.id}, function(err,data){
    if(err){
      res.send({'statu':'Erreur not found' +err})
    }
    else
      //res.send({'statu':'ok'})
      res.send(data)
  })

});

router.put('/changePassword/:id',function (req,res) {
  ModelAdmin.updateOne({_id : req.params.id},
    {
      password: passwordHash.generate(req.body.password),

    }
   , function(err){

    if(err){
      res.send({'statu':'Erreur' +err})
    }
    else
    {
      res.send({'statu':'modifier avec succées'})
    }

  })

});

router.put('/changePhoto/:id',function (req,res) {
  ModelAdmin.updateOne({_id : req.params.id},
    {
      photo: req.body.photo,

    }
    , function(err){

      if(err){
        res.send({'status':'Erreur' +err})
      }
      else
      {
        res.send({'status':'modifier avec succées'})
      }

    })

});

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

router.get('/getAllUsers',function (req,res) {
  ModelAdmin.find({}).populate('roles', 'nomRole').exec(function(err, data) {
    if(err){
      console.log("erreur ; "+err)
    }
    res.send(data)
  })

})

router.get('/getAllUserss',function (req,res) {
  ModelAdmin
    .find({})
    .populate('Role')
    .exec(function (err, users) {
      if (err) console.log(err);
      //this will log all of the users with each of their posts
      else res.send(users);
    })
})

router.get('/ShowSuperUsers',function(req,res){
  var adm = {usertype:null};
  db.collection('User').find(adm).toArray(function(err,data){
    if(err)
      res.send({'state':'Ok','msg':+err});
    res.send(data);
  });
});

router.delete('/deleteById/:id',function (req,res) {
  ModelAdmin.deleteOne({_id : req.params.id}, function(err){

    if(err){
      res.send({'statu':'Erreur' +err})
    }
    else
    {
      res.send({'statu':'supprimé avec succées'})
    }

  })

});

router.put('/updateById/:id',function (req,res) {
  ModelAdmin.updateOne({_id : req.params.id},
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      Date_Nais: req.body.Date_Nais,
      CIN : req.body.CIN,
      Mail: req.body.Mail,
      password: passwordHash.generate(req.body.password),
    }
    , function(err){

      if(err)
        res.send({'status':'Error' +err});
      else
        res.send({'status':'modifié avec succées'})


    })

});

router.get('/selectByMail/:Mail',function (req,res) {
  ModelAdmin.findOne({Mail : req.params.Mail},function (err,data) {
    if(err)
      console.log("Not found ; "+err);
    else
    if (data==null) {
      res.json({status: "User not found", data:null});
    } else
      res.send(data.Mail)
  })
});

router.get('/GetAllUsers',function(req,res){
  db.collection('User').find().toArray(function(err,data){
    if(err)
      res.send({'state':'Ok','msg':+err});
    res.send(data);
  });
});

module.exports=router;



/*router.get('/selectall',function (req,res) {
  ModelAdmin.find({},function (err,data) {
    if(err){
      console.log("erreur ; "+err)
    }
    res.send(data)
  })

})*/

/*
router.get('/selectByName/:firstName',function (req,res) {
  ModelAdmin.findOne({firstName : req.params.firstName},function (err,data) {
      if(err)
        console.log("Not found ; "+err)
      else
      if (data==null) {
        res.json({status: "User not found", data:null});
      } else
        res.send(data)
    })

  }
)*/

/*router.post('/register',function(req,res){

  let modelAdmin=new ModelAdmin({

    firstName: req.body.firstName,
    lastName: req.body.lastName,
    Date_Nais: req.body.Date_Nais,
    Sexe: req.body.Sexe,
    Pays: req.body.Pays,
    Tel: req.body.Tel,
    Mail: req.body.Mail,
    password: req.body.password,
    photo: req.body.photo,
  })
    modelAdmin.save(function (err) {
    //console.log("jjjjjjjjjjj ")

    if(err){
      res.send({'status':'Error register failed'+err})
    }
    else
    {
      res.send({'status':'register done'})
    }

  })

})*/


