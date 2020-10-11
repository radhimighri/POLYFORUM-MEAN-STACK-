let mongoose=require("mongoose");
let bcrypt=require("bcrypt");

const baseoptions={
  discriminatorKey:'doctype',
  collection:'Docs',
}

Schema=mongoose.Schema
const doc =mongoose.model('doc',new mongoose.Schema(
  {
    sujet:{
      type:String,
      required:true,
      trim:true,
    },

    texte: {
      type:String,
      required:true,
      trim:true,
    },

    datePub: {
      type:Date,
      required:true,
      default:Date.now(),

    },

    ciblePub: {
      type: String,
      required : true,
    },

    docPub: {
      type:String,
    },

  },
  baseoptions
  ).pre("save",function(next){
    next();

  }))



module.exports=mongoose.model('doc')
