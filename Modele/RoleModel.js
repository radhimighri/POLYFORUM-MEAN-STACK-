let mongoose=require("mongoose");

const baseoptions={
  discriminatorKey:'roletype',
  collection:'Role',
}

Schema=mongoose.Schema
const role =mongoose.model('role',new Schema(
  {
    nomRole:{
      type:String,
      required:true,
      trim:false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'admin'
    },



  },
  baseoptions
).pre("save",function(next){
  next();

}))


module.exports=mongoose.model('role')
