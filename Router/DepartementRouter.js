var ModelDep =require("../Modele/DepartementModel");
const express=require("express");

const router=express.Router();

router.post('/addDep',function(req,res){

  ModelDep({
    libelleDep: req.body.libelleDep,
    chef: req.body.chef,
  }).save(function (err) {
    if(err)
      res.send({'status':'Error Add failed'+err});
    else
      res.send({'status':'Add done'});

  })
});

router.delete('/deleteDep/:id',function (req,res) {
  ModelDep.deleteOne({_id : req.params.id}, function(err){

    if(err){
      res.send({'status':'Error' +err})
    }
    else
    {
      res.send({'status':'supprimé avec succées'})
    }

  })

});

router.put('/updateDep/:id',function (req,res) {
  ModelDep.updateOne({_id : req.params.id},
    {
      libelleDep: req.body.libelleDep,
      chef: req.body.chef,    }
    , function(err){

      if(err){
        res.send({'status':'Error' +err})
      }
      else
      {
        res.send({'status':'modifier avec succées'})
      }

    })

});

router.get('/ViewDeptsByID/:id',function(req,res){
  ModelDep.findOne({_id : req.params.id})
    .populate('chef')
    .exec(function(err,data){
      if(err)
        res.send(err);
      else
        res.send(data);
    })
});

router.get('/selectAllDeps',function (req,res) {
  ModelDep.find({})
    .populate('chef')
    .exec(function(err,data){
      if(err)
        res.send(err);
      else
        res.send(data);
    })
});

router.get('/selectDeps',function (req,res) {
  ModelDep.find({},function (err,data) {
    if(err){
      console.log("erreur ; "+err)
    }
    res.send(data)
  })
});

/*router.get('/selectDepByName',function (req,res) {
  ModelDep.findOne({libelleGroup : req.params.libelleGroup},function (err,data) {
      if(err){
        console.log("Not found ; "+err)
      }
      res.send(data)
    })
})*/

module.exports=router;
