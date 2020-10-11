let mongoose=require("mongoose");
let bcrypt=require("bcrypt");

const baseoptions={
  discriminatorKey:'emailtype',
  collection:'Email',
}

Schema=mongoose.Schema
const email =mongoose.model('email',new mongoose.Schema(
  {


  },
  baseoptions
).pre("save",function(next){
  next();

}))



module.exports=mongoose.model('email')
