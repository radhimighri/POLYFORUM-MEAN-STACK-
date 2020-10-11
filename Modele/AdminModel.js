let mongoose=require("mongoose");
let bcrypt=require("bcrypt");
let passwordHash = require('password-hash');


const baseoptions={
  discriminatorKey:'usertype',
  collection:'User',
}

Schema=mongoose.Schema
const admin =mongoose.model('admin',new Schema(
  {
    firstName:{
      type:String,
      required:true,
      trim:true,
    },

   lastName: {
      type:String,
      required:true,
      trim:true,
    },

    Date_Nais: {
      type:Date,
      required : true,
      trim : false,

},

    Sexe: {
      type:String,
      required:true,
      trim:true,
    },

    Pays: {
      type:String,
      required:true,
      trim:true,
    },

    Tel: {
      type:String,
      required:true,
      trim:true,
    },
    Mail:{
      type:String,
      required:true,
      trim:true,
    },

    confirme:{
      type: Boolean,
      required: false,
      default: true,
    },

    password:{
      type:String,
      required:true,
      trim:true,
    },



    CIN: {
      type: Number,
      required : true,
      trim : false,
    },


    /*roles: [{ type: Schema.Types.ObjectId, ref: 'RoleModel' }]*/

    },
      baseoptions
    ).pre("save",function(next){
  //this.password=bcrypt.hashSync(this.password,10);
      this.password=passwordHash.generate(this.password);
      next();
    }));



module.exports=mongoose.model('admin')
