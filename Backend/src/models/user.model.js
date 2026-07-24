const validator=require('validator');

const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        required:[true,"Name is required"],
        type:String,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true,
        match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address"
    ]
    },
    password:{
        required:[true,"Password is required"],
        type:String,
    },

  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
    calorieGoal: {
      type: Number,
    },
    
    proteinGoal: {
      type: Number,
    },
   
},
{timestamps:true})

const User=mongoose.model('User',userSchema);

module.exports=User;