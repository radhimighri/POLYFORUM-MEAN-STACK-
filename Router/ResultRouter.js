var ModelResult  =require("../Modele/ResultModel");
const express=require("express");
const router=express.Router();
var fs = require('file-system');
var multer  = require('multer');
var upload = multer({ dest:'/../src/assets/Uploads/' });

router.post('/SendRes',upload.single('relever'),function (req,res) {
  const file = __dirname + '/../src/assets/Uploads/Results/' + req.file.originalname;
  fs.readFile(req.file.path,function(err,data){
    fs.writeFile(file,data,function(err) {
      if (err)
        res.json({INFO: err});
      else
      {
        ModelResult({
          res: req.body.res,
          moy: req.body.moy,
          student: req.body.student,
          relever: req.file.originalname,
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

router.get('/ViewRes/:id',function (req,res) {
  ModelResult.findOne({'student' : req.params.id}, function(err,data){
    if(err)
      res.send({'statu':'Erreur not found' +err});
    else
      res.send(data)
  }).populate('student');

});



router.post('/UploadRelevRes',upload.single('relever'),function(req,res){
  const file = __dirname + '/Uploads/Resultats/' + req.file.originalname;
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
