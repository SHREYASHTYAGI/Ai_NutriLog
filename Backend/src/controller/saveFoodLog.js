const {FoodLogModel, foodLogModel}=require("../models/foodLog");

const saveFoodLog=async(req,res)=>{
try
   {
    
    const {date,foods}=req.body;
    const userId=req.user.id;

    if(!date||!foods){
        return res.status(400).json({
            success:false,
             message:"All fields are required"
        })
    }

    await foodLogModel.findOneAndUpdate({userId,date},{
        userId,
        date,
        foods,
    })

    return res.status(200).json({
      success: true,
      message: "Food log saved successfully.",
      data: savedLog,
    });

   }

   catch(err){
    return res.status(400).json({
         message:err.message,
         success:false
    })
   }
}

module.exports={saveFoodLog}