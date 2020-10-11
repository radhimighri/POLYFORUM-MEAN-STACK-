let mongoose = require('mongoose');
const admin = require ('./AdminModel');

Schema=mongoose.Schema

const Student = admin.discriminator('Student', new Schema(
  {

    matricule : {
      type : String,
      trim  : true ,
      required : true,
    },

    Group : {
      type : mongoose.Schema.Types.ObjectId,
      ref  : 'Group' ,
    },


    confirme : {
      type : Boolean,
      trim  : true ,
      default: false ,
    },

    photo: {
     type:  String,
    }


    // camping:{
    //   type:Schema.Types.ObjectId,
    //   ref:'camping'
    // }

  }))

module.exports = mongoose.model('Student');
