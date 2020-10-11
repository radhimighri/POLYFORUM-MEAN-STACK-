let mongoose=require("mongoose");
let bcrypt=require("bcrypt");

const baseoptions={
  discriminatorKey:'Resultstype',
  collection:'Results',
};

Schema=mongoose.Schema;
const results =mongoose.model('results',new Schema(
  {
    res:{
      type:String,
      required:true,
      trim:true,
    },

    moy: {
      type:String,
      required:true,
      trim:true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'admin'

    },

    relever: {
      type:String
    },

  },
  baseoptions
).pre("save",function(next){
  next();

}));

module.exports=mongoose.model('results');
