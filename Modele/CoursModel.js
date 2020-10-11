let mongoose=require("mongoose");

const baseoptions={
  discriminatorKey:'courstype',
  collection:'Cours',
}

Schema=mongoose.Schema
const cours =mongoose.model('cours',new Schema(
  {
    libelle:{
      type:String,
      required:true,
      trim:true,
    },

    description:{
      type:String,
      required:true,
      trim:true,
    },

    datePub:{
      type:Date,
      required:true,
      default:Date.now(),
    },

    fichier:{
      type:String,
      required:true,
      trim:true,
    },

    prof:{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Prof'
    },

    group:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group'
    },

  },
  baseoptions
  ).pre("save",function(next){
    next();

  }))


module.exports=mongoose.model('cours')
