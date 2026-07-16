import BottomNavbar from "../components/BottomNavbar";
import Calendar from "react-calendar";
import Fdata from "../data/Fdata.json"
import Select from 'react-select';
import Input from "../components/Input";
import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import ProtienChart from "../components/charts/ProteinChart"
import MacroChart from "../components/charts/MacroChart";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);



export default function Dashboard() {

  type Food=typeof Fdata[number];
  type FoodLog = {
  id: number;
  foodId: number;
  name: string;
  emoji: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

    type FoodOption = {
  value: number;
  label: string;
  data: Food;
};

const [selectedOption, setSelectedOption] = useState<FoodOption | null>(null);
const [quant, setQuant] = useState("");
  const [foodLog, setFoodLog] = useState<FoodLog[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
const [editQuantity, setEditQuantity] = useState("");
const [currWeight, setCurrWeight] = useState<number | "">("");
const proteinGoal =
  currWeight === "" ? 0 : Math.round(currWeight * 1.8);

const calorieGoal =
  currWeight === "" ? 0 : Math.round(currWeight * 35);

console.log(currWeight)


  
  const options = useMemo(
  () =>
    Fdata.map(food => ({
      value: food.id,
      label: `${food.emoji} ${food.displayName}`,
      data: food,
    })),
  []
);


const totalProtein = foodLog.reduce(
  (sum, item) => sum + item.protein,
  0
);

const totalCarbs = foodLog.reduce(
  (sum, item) => sum + item.carbs,
  0
);

const totalFat = foodLog.reduce(
  (sum, item) => sum + item.fat,
  0
);
 
const deleteFood=(id:Number)=>{
       setFoodLog((e)=>e.filter((item)=>item.id!==id));
}

  const addFood=()=>{
     if(!selectedOption||!quant) return alert('Choose');

     const food=selectedOption.data;
     const quantity=Number(quant);
const existingFood = foodLog.find(
  (item) => item.foodId === food.id
);

if (existingFood) {
  setFoodLog((prev) =>
    prev.map((item) => {
      if (item.foodId !== food.id) return item;

      const newQuantity = item.quantity + quantity;

      return {
        ...item,
        quantity: newQuantity,
        calories: +(food.calories * newQuantity).toFixed(1),
        protein: +(food.protein * newQuantity).toFixed(1),
        carbs: +(food.carbs * newQuantity).toFixed(1),
        fat: +(food.fat * newQuantity).toFixed(1),
      };
    })
  );
} else{
     const newFood: FoodLog = {
        id: Date.now(),
        foodId: food.id,
        name: food.displayName,
        emoji: food.emoji,
        quantity,
        unit: food.unit,
        calories: +(food.calories * quantity).toFixed(1),
        protein: +(food.protein * quantity).toFixed(1),
        carbs: +(food.carbs * quantity).toFixed(1),
        fat: +(food.fat * quantity).toFixed(1),
      };
      
     setFoodLog((e) => [...e, newFood]); 
     setSelectedOption(null)
     setQuant("");
}
      
  }
  
  const startEdit=(item:FoodLog)=>{
       setEditingId(item.id);
       setEditQuantity(item.quantity.toString());
  }

  const saveEdit=()=>{
       
    if(!editingId||editingId===null) return;

    const quantity=Number(editQuantity);

    if (quantity <= 0) {
    alert("Quantity must be greater than 0");
    return;
  }

     setFoodLog((e)=>e.map((item)=>{
         if(item.id!==editingId){
          return item;
         }
         else{

    const food = Fdata.find((e) => e.id === item.foodId);

    if(!food) return item;

          return {
        ...item,
        quantity,
        calories: +(food.calories * quantity).toFixed(1),
        protein: +(food.protein * quantity).toFixed(1),
        carbs: +(food.carbs * quantity).toFixed(1),
        fat: +(food.fat * quantity).toFixed(1),
      };
         }
     }));
     setEditingId(null);
     setEditQuantity("");
 }

 


  return (

<div className="min-h-screen w-full bg-[#0B0707] text-white">
  <div className="w-full px-8 lg:px-12 py-8">
       <div className="grid grid-cols-12 gap-6">

  {/* LEFT */}
  <div className="col-span-4 space-y-6">

    
    <div className="h-95 rounded-3xl border border-white/10 bg-[#171717] p-6">
      <Calendar/>
    </div>


   
    
    <div className="rounded-3xl border border-white/10 bg-[#171717] p-6">

  {/* First Row */}
  <div className="flex items-center gap-3">

    <div className="flex-1">
      <Select
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>

    <div className="w-15 flex items-center justify-center">
      <Input
        placeholder="Qty"
        value={quant}
        onChange={(e) => setQuant(e.target.value)}
      />
    </div>

  </div>

  {/* Second Row */}
  <div className="mt-2 h-8 bg-amber-800 text-2xl w-2xs flex items-center   justify-center">
    <button className="w-100"  onClick={addFood} >Add</button>
  </div>

</div>

   

    {/* Target */}
    <div className="h-60 rounded-3xl border border-white/10 bg-[#171717] p-6 flex flex-col justify-between">

  <div>
    <h2 className="text-xl font-semibold text-white">
      🎯 Today's Target
    </h2>

    <p className="mt-1 text-sm text-gray-400">
      Enter your current weight
    </p>
  </div>

  <input
    type="number"
    placeholder="Weight (kg)"
    value={currWeight}
    onChange={(e) =>
      setCurrWeight(
        e.target.value === "" ? "" : Number(e.target.value)
      )
    }
    className="mt-3 rounded-xl border border-white/10 bg-[#202020] px-4 py-2 text-white outline-none transition focus:border-green-500"
  />

  <div className="mt-4 flex justify-between">

    <div className="flex flex-col rounded-2xl bg-[#202020] px-4 py-3 w-[48%]">
      <span className="text-sm text-gray-400">
        Protein
      </span>

      <span className="mt-1 text-2xl font-bold text-green-400">
        🥩 {proteinGoal}g
      </span>
    </div>

    <div className="flex flex-col rounded-2xl bg-[#202020] px-4 py-3 w-[48%]">
      <span className="text-sm text-gray-400">
        Calories
      </span>

      <span className="mt-1 text-2xl font-bold text-orange-400">
        🔥 {calorieGoal}
      </span>
    </div>

  </div>

</div>
     

  </div>
  

  {/* RIGHT */}
  <div className="col-span-8 space-y-6">

    {/* Charts */}
    <div className="grid grid-cols-2 gap-6">

      <div className="h-90 rounded-3xl border border-white/10 bg-[#171717] p-6">
     
              <ProtienChart consumed={totalProtein}
                   goal={proteinGoal} />

      </div>

      <div className="h-90 rounded-3xl border border-white/10 bg-[#171717] p-6">
         <MacroChart
        protein={totalProtein}
         carbs={totalCarbs}
         fat={totalFat}
       />     
      </div>

    </div>

    {/* Food Log */}

     

    <div  className="  h-132.5 rounded-3xl border border-white/10 bg-[#171717] p-6">
         {foodLog.length=== 0 ?(
               <p className="text-gray-400">
                   No food added yet.
                </p>
         ):(<div className="flex gap-5 flex-wrap items-center justify-center">
  {foodLog.map((item) => (
    <div
      key={item.id}
      className="
        mb-4 w-60
        rounded-2xl
        border border-white/10
        bg-[#1A1A1A]
        p-4
        transition-all
        duration-300
        hover:border-orange-500/50
        hover:shadow-lg hover:shadow-orange-500/10
      "
    >
      {/* Top */}
      <div className="flex items-start justify-between">

        <div>
          <h3 className="flex items-center gap-2  font-semibold text-white">
            <span className="text-2xl">{item.emoji}</span>
            {item.name}
          </h3>

           {editingId===item.id ?
               (<>
                  <Input placeholder="update" value={editQuantity} onChange={(e)=>setEditQuantity(e.target.value)} />
               
               </>):(<>
                 {item.quantity} {item.unit}
               </>)
            }
        </div>

         

      <div className="flex gap-1">
             {editingId===item.id?
          (<> 
              <button  onClick={saveEdit} className="
              rounded-lg
              text-2xl
               w-10
               pb-2
              text-gray-400
              transition
              hover:bg-orange-500/20
              hover:text-orange-400
            " >✔️</button>
              <button  onClick={ ()=>{setEditingId(null) ,setEditQuantity("")} } className="
              rounded-lg
              p-2
              text-gray-400
              transition
              hover:bg-red-500/20
              hover:text-red-400
            ">❌</button>
           </>)
          :
          (<>
             <button
            className="
              rounded-lg
              p-2
            
              text-gray-400
              transition
              hover:bg-orange-500/20
              hover:text-orange-400
            "

            onClick={()=>startEdit(item)}
          >
            <Pencil size={18} />
          </button>

          <button
            className="
              rounded-lg
              p-2
              text-gray-400
              transition
              hover:bg-red-500/20
              hover:text-red-400
            "

            onClick={()=>deleteFood(item.id)}
          >
            <Trash2 size={18} />
          </button>
          </>)
          }
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-white/10" />

      {/* Nutrition */}
      <div className="flex justify-between">

        <div className="flex  flex-col items-center flex-1">
          <span className="text-shadow-xs">🥩</span>
          <p className="text-lg font-semibold text-orange-400">
            {item.protein} g
          </p>
          <p className="text-xs text-gray-500">
            Protein
          </p>
        </div>

        <div className="w-px bg-white/10"></div>

        <div className="flex flex-col items-center flex-1">
          <span className="text-2xs">🍚</span>
          <p className="text-lg font-semibold text-yellow-400">
            {item.carbs} g
          </p>
          <p className="text-xs text-gray-500">
            Carbs
          </p>
        </div>

      </div>
    </div>
  ))}
</div>
      )}
     </div>

  </div>
  <BottomNavbar/>
</div>
  </div>
</div>

  );
}