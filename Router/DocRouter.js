var ModelDoc  =require("../Modele/DocModel");
const express=require("express");
const router=express.Router();
var jwt =require("jsonwebtoken")
var fs = require('file-system');
var multer  = require('multer')
var upload = multer({ dest: '/../src/assets/Uploads/' });



router.post('/addDoc',upload.single('docPub'),function (req,res) {
  const file = __dirname + '/../src/assets/Uploads/docs/' + req.file.originalname;
  fs.readFile(req.file.path,function(err,data){
    fs.writeFile(file,data,function(err) {
      if (err)
        res.json({INFO: err});
      else
      {
         ModelDoc({
          sujet: req.body.sujet,
          texte: req.body.texte,
          datePub: req.body.datePub,
          ciblePub: req.body.ciblePub,
          docPub: req.file.originalname,
        }).save(function (err) {
          if(err)
            res.send({'status':'Error register failed'+err});
          else
            res.send({'status':'register done'})
        })
      }
    });
  });
});

router.get('/selectDocs',function (req,res) {
  ModelDoc.find({}).sort({datePub : -1})
    .exec(function(err,data){
      if (err)
        res.send(err);
      else
        res.send(data);
    })

});


router.get('/docViewbyID/:id',function(req,res){
  ModelDoc.findOne({_id : req.params.id})
    .exec(function(err,data){
      if(err)
        res.send(err);
      else
        res.send(data);
    })
});


router.delete('/deleteDoc/:id',function (req,res) {
  ModelDoc.deleteOne({_id : req.params.id}, function(err){

    if(err){
      res.send({'statu':'Erreur' +err})
    }
    else
    {
      res.send({'statu':'supprimé avec succées'})
    }
  })
});

router.post('/UploadPubDoc',upload.single('docPub'),function(req,res){
  const file = __dirname + '/Uploads/Documents/' + req.file.originalname;
  fs.readFile(req.file.path,function(err,data){
    fs.writeFile(file,data,function(err){
      if(err)
        res.json({INFO: err});
      else
        res.json({INFO:'Your file has been successfully uploaded !',filename: req.file.originalname});
    });
  });
});



module.exports=router;
