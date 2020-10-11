var mongoose = require('mongoose');
const admin = require ('./AdminModel');

Schema=mongoose.Schema

const Prof = admin.discriminator('Prof', new mongoose.Schema(
  {

    nomDepartement : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'dep'
    },

    photo:{
      type:String
    },
    confirme : {
      type : Boolean,
      trim  : true ,
      default: false ,
    },


    // camping:{
    //   type:Schema.Types.ObjectId,
    //   ref:'camping'
    // }

  }))

module.exports = mongoose.model('Prof');
