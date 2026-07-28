const groq = require("../config/groq");
const User=require('../models/user.model');
const { foodLogModel}=require("../models/foodLog");

//user
//goal
//fetch last 7 days of user
//calculate avg 
//compare with the goal
//get streak
//.....AI.....
//pros,cons,suggest imporovemnt in diet


const generateAnalysis = async (req, res) => {

    const userId=req.user.id;
    const user = await User.findById(userId);
    
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

     //we have found user

     const today=new Date();

     const weekLog=[];

     for (let i=0;i < 7;i++){
        const curr=new Date(today);

        curr.setDate(curr.getDate()-i);
        
         const date = `${curr.getFullYear()}-${String(
       curr.getMonth() + 1
         ).padStart(2, "0")}-${String(curr.getDate()).padStart(2, "0")}`;

         const log=await foodLogModel.findOne({userId,date});

         if(log){
            weekLog.push(log);
         }
     }
    
let totalCaloriesWeek = 0;
let totalProteinWeek = 0;

let calorieGoalMet = 0;
let proteinGoalMet = 0;

const foodFrequency = {};

const dailyData = [];

weekLog.forEach((log)=>{
     let dayCalories=0;
     let dayProtein=0;
     
     log.foods.forEach((food)=>{
        dayCalories+=food.calories;
        dayProtein+=food.protein;

         foodFrequency[food.name] =
        (foodFrequency[food.name] || 0) + 1;
     })
     totalCaloriesWeek += dayCalories;
     totalProteinWeek += dayProtein;

  if (dayCalories >= user.calorieGoal)
    calorieGoalMet++;

  if (dayProtein >= user.proteinGoal)
    proteinGoalMet++;

   dailyData.push({
    date: log.date,
    calories: Math.round(dayCalories),
    protein: Math.round(dayProtein),

    calorieDifference:
        Math.round(dayCalories - user.calorieGoal),

    proteinDifference:
        Math.round(dayProtein - user.proteinGoal),

    calorieStatus:
        dayCalories < user.calorieGoal * 0.9
            ? "calories are below the target"
            : dayCalories <= user.calorieGoal * 1.1
            ? "calories are on target"
            : "calories are above the target"
});

})

const averageCalories =
  weekLog.length === 0
    ? 0
    : Math.round(totalCaloriesWeek / weekLog.length);

const averageProtein =
  weekLog.length === 0
    ? 0
    : Math.round(totalProteinWeek / weekLog.length);

    let calorieStatus="";

  


const analysisData = {
  calorieGoal: user.calorieGoal,
  proteinGoal: user.proteinGoal,

  averageCalories,
  averageProtein,

  totalCaloriesWeek,
  totalProteinWeek,

  calorieGoalMet,
  proteinGoalMet,

  foodFrequency,

  dailyData,
};


const prompt = `
You are an expert sports nutritionist and dietician.

Analyze the following user's weekly nutrition data.

User Data:
${JSON.stringify(analysisData, null, 2)}

Instructions:
- Analyze calorie intake consistency.
- Analyze protein intake consistency.
- Analyze food choices.
- Analyze streak performance.
- Mention whether the user is overeating, undereating, or maintaining calories.
- Mention possible nutrient deficiencies if noticeable.
- Give practical food recommendations.
- Keep the tone motivating.
-return score out of 10.

Return ONLY valid JSON in this exact format:

{
  "score": number,
  "summary": "string",
  "strengths": [
    "string",
    "string",
    "string"
  ],
  "weaknesses": [
    "string",
    "string",
    "string"
  ],
  "recommendations": [
    "string",
    "string",
    "string"
  ],
  "motivation": "string"
}

Do not include markdown.
Do not include explanations outside the JSON.
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "You are an expert nutritionist who always returns valid JSON only.",
        },
        {
          role: "user",
          content:prompt,
        },
      ],
    });

    return res.status(200).json({
      success: true,
      report: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  generateAnalysis,
};