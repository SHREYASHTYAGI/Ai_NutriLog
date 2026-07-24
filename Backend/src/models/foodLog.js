const mongoose= require('mongoose');



const foodSchema = new mongoose.Schema(
  {
    foodId: {
      type: String,
      required: true,
    },
    emoji:{
      type:String,
      required:true
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    carbs: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const foodLogSchema=new mongoose.Schema({
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
     },
     date:{
        type:String,
        required:true,
     },
     foods:{
        type:[foodSchema],
        default:[]
     }
},{timestamps:true})

const foodLogModel=mongoose.model("foodLog",foodLogSchema);
module.exports={foodLogModel};