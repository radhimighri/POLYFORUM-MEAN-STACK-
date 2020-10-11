let mongoose=require("mongoose");
let bcrypt=require("bcrypt");

const baseoptions={
  discriminatorKey:'contacttype',
  collection:'Contacts',
}

Schema=mongoose.Schema
const contact =mongoose.model('contact',new Schema(
  {
    sujet:{
      type:String,
      required:true,
      trim:true,
    },

    contenu: {
      type:String,
      required:true,
      trim:true,
    },

    dateDemande: {
      type:Date,
      required:true,
      default:Date.now(),

    },

    user: {
      type:String,
      required:true,
      trim:true,
    },


  },
  baseoptions
  ).pre("save",function(next){
    next();

  }))

module.exports=mongoose.model('contact')
