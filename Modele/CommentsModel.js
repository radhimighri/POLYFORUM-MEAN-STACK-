let mongoose=require("mongoose");
let bcrypt=require("bcrypt");

const baseoptions={
  discriminatorKey:'Commenttype',
  collection:'Comments',
}

Schema=mongoose.Schema;
const comments =mongoose.model('comments',new Schema(
  {
    comm:{
      type:String,
      required:true,
      trim:true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'admin',
      trim: true,
    },

    cours: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'cours'

    },

    dateComment: {
      type:Date,
      default:Date.now(),
    },

  },
  baseoptions
  ).pre("save",function(next){
    next();

  }))

module.exports=mongoose.model('comments')
