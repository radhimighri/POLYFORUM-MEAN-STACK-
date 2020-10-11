var ModelRole  =require("../Modele/RoleModel");
const express=require("express");
const router=express.Router();
var jwt =require("jsonwebtoken")



router.post('/addRole',function(req,res){

  modelRole = new ModelRole({

    nomRole: req.body.nomRole,
  })
  modelRole.save(function (err) {
    if(err){
      res.send({'status':'Error register failed'+err})
    }
    else
    {
      res.send({'status':'register done'})
    }

  })

})




module.exports=router;
