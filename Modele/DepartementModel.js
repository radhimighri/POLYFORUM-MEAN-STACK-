let mongoose=require("mongoose");

const baseoptions={
  discriminatorKey:'departmenttype',
  collection:'Departments',
}

Schema=mongoose.Schema
const dep =mongoose.model('dep',new Schema(
  {
    libelleDep:{
      type:String,
      required:true,
      trim:true,
    },

    chef:{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Prof'
    },

  },
  baseoptions
  ).pre("save",function(next){
    next();

  }))


module.exports=mongoose.model('dep')
