var ModelGroup =require("../Modele/GroupModel");
const express=require("express");

const router=express.Router();

router.post('/addGroup',function(req,res){

  var modelGroup = new ModelGroup({

    libelleGroup: req.body.libelleGroup,
  })
  modelGroup.save(function (err) {
    if(err){
      res.send({'status':'Error Add failed'+err})
    }
    else
    {
      res.send({'status':'Add done'})
    }

  })

})

router.get('/selectAllGroups',function (req,res) {
  ModelGroup.find({},function (err,data) {
    if(err){
      console.log("erreur ; "+err)
    }
    res.send(data)
  }).sort({libelleGroup : 1})

})

router.delete('/deleteGroup/:id',function (req,res) {
  ModelGroup.deleteOne({_id : req.params.id}, function(err){

    if(err){
      res.send({'status':'Error' +err})
    }
    else
    {
      res.send({'status':'supprimé avec succées'})
    }

  })

})

router.put('/updateGroup/:id',function (req,res) {
  ModelGroup.updateOne({_id : req.params.id},
    {
      libelleGroup: req.body.libelleGroup,
    }
    , function(err){

      if(err){
        res.send({'status':'Error' +err})
      }
      else
      {
        res.send({'status':'modifier avec succées'})
      }

    })

})

router.get('/groupViewbyID/:id',function(req,res){
  ModelGroup.findOne({_id : req.params.id})
    .exec(function(err,data){
      if(err)
        res.send(err);
      else
        res.send(data);
    })
});

/*router.get('/selectGroupByName',function (req,res) {
  ModelGroup.findOne({libelleGroup : req.params.libelleGroup},function (err,data) {
      if(err){
        console.log("Not found ; "+err)
      }
      res.send(data)
    })

  })*/

module.exports=router;
