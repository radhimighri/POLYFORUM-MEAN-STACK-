var ModelContact  =require("../Modele/ContactModel");
const express=require("express");

const router=express.Router();



router.post('/sendContact',function(req,res){

  modelContact = new ModelContact({

    sujet: req.body.sujet,
    contenu: req.body.contenu,
    //dateDemande: req.body.dateDemande,
    user: req.body.user,
  })
  modelContact.save(function (err) {
    if(err){
      res.send({'status':'Error sent failed'+err})
    }
    else
    {
      res.send({'status':'sent done'})
    }

  })

})

router.delete('/deleteContact/:id',function (req,res) {
  ModelContact.deleteOne({_id : req.params.id}, function(err){

    if(err){
      res.send({'statu':'Erreur' +err})
    }
    else
    {
      res.send({'statu':'supprimé avec succées'})
    }

  })

})

router.get('/selectAllContacts',function (req,res) {
  ModelContact.find({},function (err,data) {
    if(err){
      console.log("erreur ; "+err)
    }
    res.send(data)
  })

})

router.get('/contactView/:id',function (req,res) {
  ModelContact.findOne({_id : req.params.id}, function(err,data){

    if(err){
      res.send({'statu':'Erreur not found' +err})
    }
    else
    {
      if (data==null) {
        res.json({status: "User not found", data:null});
      } else
      //res.send({'statu':'ok'})
        res.send(data)

    }

  })

})





module.exports=router;
