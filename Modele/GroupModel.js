let mongoose=require("mongoose");

const baseoptions={
  discriminatorKey:'grouptype',
  collection:'Groups',
}

Schema=mongoose.Schema
const Group =mongoose.model('Group',new Schema(
  {
    libelleGroup:{
      type:String,
      required:true,
      trim:true,
    },

  },
  baseoptions
  ).pre("save",function(next){
    next();

  }))

module.exports=mongoose.model('Group');
