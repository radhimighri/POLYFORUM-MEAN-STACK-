var ModelCours =require("../Modele/CoursModel");
const express=require("express");
const router=express.Router();
var fs = require ("fs");
const multer = require('multer');
var upload = multer({ dest: '/../src/assets/Uploads/' });


router.post('/addCourse' ,upload.single('fichier'),function(req,res) {
  const file = __dirname + '/../src/assets/Uploads/Courses/' + req.file.originalname;
  fs.readFile(req.file.path, function (err, data) {
    fs.writeFile(file, data, function (err) {
      if (err)
        res.json({INFO: err});
      else {
        ModelCours = new ModelCours({

          libelle: req.body.libelle,
          description: req.body.description,
          fichier: req.body.fichier,
          prof: req.body.prof,
          group: req.body.group,
        });
        ModelCours.save(function (err) {
          if (err)
            res.send({'status': 'Error Add failed' + err});
          else
            res.send({'status': 'Add done'});
        })
      }
    });
  });
});

router.delete('/deleteCourse/:id',function (req,res) {
  ModelCours.deleteOne({_id : req.params.id}, function(err){

    if(err){
      res.send({'statu':'Erreur' +err})
    }
    else
    {
      res.send({'statu':'supprimé avec succées'})
    }

  })

});

router.get('/selectAllCourses',function (req,res) {
  modelCours.find({},function (err,data) {
    if(err){
      console.log("erreur ; "+err)
    }
    res.send(data)
  })

});

router.get('/selectCourse',function (req,res) {
  ModelCours.find({})
    .populate('group')
    .populate('prof')
    .exec(function(err,data){
      if(err)
        res.send(err);
      else
        res.send(data);
    })

  });

router.get('/selectCourseForStudents',function (req,res) {
  ModelCours.find({})
    .populate('prof')
    .populate('group')
    .exec(function(err,data){
      if(err)
        res.send(err);
      else
        res.send(data);
    })

});

// router.post('/UploadCourse',upload.single('fichier'),function(req,res){
//   const file = __dirname + '/../src/assets/Uploads/Courses/' + req.file.originalname;
//   fs.readFile(req.file.path,function(err,data){
//     fs.writeFile(file,data,function(err){
//       if(err)
//         res.json({INFO: err});
//       else
//         res.json({INFO:'Your file has been successfully uploaded !',filename: req.file.originalname});
//     });
//   });
// });

router.get('/CourViewbyID/:id',function(req,res){
  ModelCours.findOne({_id : req.params.id})
    .populate('group')
    .populate('prof')
    .exec(function(err,data){
      if(err)
        res.send(err);
      else
        res.send(data);
    })


})


module.exports=router;
