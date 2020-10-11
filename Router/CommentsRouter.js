let ModelComment  =require("../Modele/CommentsModel");
const express=require("express");
let jwt =require("jsonwebtoken");
const router=express.Router();
router.post('/addComment/:id',function(req,res){

  ModelComment({
    comm: req.body.comm,
    user: req.body.user,
    cours: req.params.id,
    dateComment: req.body.dateComment,
  }).save(function (err) {
    if(err){
      res.send({'status':'Error comment failed'+err})
    }
    else
    {
      res.send({'status':'comment done'})
    }

  })

});
router.get('/commentView/:id',function (req,res) {
  ModelComment.find({'cours': req.params.id})
    .populate('user')
    .populate('cours')
    .exec(function(err,data){
      if(err)
        res.send(err);
      else
        res.send(data);
    })
});
router.delete('/deleteComment/:id',function (req,res) {
  ModelComment.deleteOne({_id : req.params.id}, function(err){

    if(err){
      res.send({'status':'Error' +err})
    }
    else
    {
      res.send({'status':'supprimé avec succées'})
    }

  })

});
module.exports=router;
