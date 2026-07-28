const { all } = require("../app");
const { foodLogModel}=require("../models/foodLog");
const userModel=require("../models/user.model") 

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
    },
     {
        new:true,
        upsert:true
     }
    )

    return res.status(200).json({
      success: true,
      message: "Food log saved successfully.",
      data: foodLogModel,
    });

   }

   catch(err){
    return res.status(400).json({
         message:err.message,
         success:false
    })
   }
}

const getFoodLog=async(req,res)=>{
      const userId=req.user.id;
      const {date}=req.params;

      const FoodLog=await foodLogModel.findOne({date,userId});
       
      try{
             if (!FoodLog) {
                return res.status(200).json({
                  success: true,
                  foods: [],
                });
              }
              
              console.log(FoodLog)
           return res.status(200).json({
              success:true,
               foods: FoodLog? FoodLog.foods:[],
           })
       }
       catch(err){
            alert(err.response?.data?.message)
       }

        
        
      }

const getProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    const { period = "daily", weekOffset = 0 } = req.query;

    const offset = Number(weekOffset) || 0;


    if (period === "daily") {

      const today = new Date();

      // Remove time part
      today.setHours(0, 0, 0, 0);


      // Find Monday of current week
      const day = today.getDay(); // Sunday = 0

      const diff = day === 0 ? -6 : 1 - day;

      const startDate = new Date(today);

      startDate.setDate(
        today.getDate() + diff - offset * 7
      );


      // Sunday of that week
      const endDate = new Date(startDate);

      endDate.setDate(
        startDate.getDate() + 6
      );


      const startStr = startDate
        .toISOString()
        .split("T")[0];

      const endStr = endDate
        .toISOString()
        .split("T")[0];


      const logs = await foodLogModel.find({
        userId,
        date: {
          $gte: startStr,
          $lte: endStr,
        },
      })
      .sort({ date: 1 });


      const chartData = logs.map((log) => {

        let calories = 0;
        let protein = 0;
        let carbs = 0;
        let fat = 0;


        log.foods.forEach((food) => {

          calories += Number(food.calories || 0);
          protein += Number(food.protein || 0);
          carbs += Number(food.carbs || 0);
          fat += Number(food.fat || 0);

        });


        return {
          date: log.date,

          calories: Number(calories.toFixed(1)),
          protein: Number(protein.toFixed(1)),
          carbs: Number(carbs.toFixed(1)),
          fat: Number(fat.toFixed(1)),
        };

      });


      return res.status(200).json({
        success: true,
        week: {
          start: startStr,
          end: endStr,
        },
        reports: chartData,
      });

    }


    return res.status(400).json({
      success: false,
      message: "Invalid period",
    });


  } catch (err) {

    console.error("Progress Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

const getStreak = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const calGoal = user.calorieGoal;
    const proGoal = user.proteinGoal;

    let streak = 0;

    // Match frontend/MongoDB date format: local YYYY-MM-DD (not UTC via toISOString)
    const toLocalDateString = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    let currDate = new Date();
    currDate.setHours(0, 0, 0, 0);

    while (true) {
      const date = toLocalDateString(currDate);

      console.log("[streak] searching date:", date, "userId:", userId);

      const log = await foodLogModel.findOne({
        userId,
        date,
      });

      console.log("[streak] fetched log:", log ? { date: log.date, foodCount: log.foods.length } : null);

      if (!log) {
        console.log("[streak] no log for date, stopping. streak:", streak);
        break;
      }

      let totalCal = 0;
      let totalPro = 0;

      log.foods.forEach((food) => {
        totalCal += Number(food.calories || 0);
        totalPro += Number(food.protein || 0);
      });

      console.log("[streak] totals:", {
        totalCal,
        totalPro,
        calorieGoal: calGoal,
        proteinGoal: proGoal,
        goalsMet: totalCal >= calGoal && totalPro >= proGoal,
      });

      if (totalCal >= calGoal && totalPro >= proGoal) {
        streak++;
        console.log("[streak] day counted, streak now:", streak);
      } else {
        console.log("[streak] goals not met, stopping. streak:", streak);
        break;
      }

      currDate.setDate(currDate.getDate() - 1); //previous dates
    }

    return res.status(200).json({
      success: true,
      streak,
    });
  } catch (err) {
    console.error("STREAK ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getStreak,
};

module.exports={saveFoodLog,getFoodLog,getProgress,getStreak};