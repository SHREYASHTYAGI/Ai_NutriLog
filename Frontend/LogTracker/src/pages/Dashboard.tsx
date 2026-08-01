import BottomNavbar from "../components/BottomNavbar";
import Calendar from "react-calendar";
import Fdata from "../data/Fdata.json"
import Select from 'react-select';
import Input from "../components/Input";
import { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import ProtienChart from "../components/charts/ProteinChart"
import MacroChart from "../components/charts/MacroChart";
import api from "../api/axios";


import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { number } from "framer-motion";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);



export default function Dashboard() {

  type Food=typeof Fdata[number];
  type FoodLog = {
  id: number;
  foodId: string;
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
  const [foodLog, setFoodLog] = useState<FoodLog[]>(()=>{
       const draft=localStorage.getItem("foodDraft");
     return draft?JSON.parse(draft):[];

  });
   
const [editingId, setEditingId] = useState<string | null>(null);const [editQuantity, setEditQuantity] = useState("");
const [currWeight, setCurrWeight] = useState<number | "">(()=>{
    const wDraft=localStorage.getItem("weD");
    return wDraft?Number(wDraft):"";
});



const [streak, setStreak] = useState(0);

useEffect(() => {
  const fetchStreak = async () => {
    try {
      const res = await api.get("/streak");
      setStreak(res.data.streak);
    } catch (err) {
      console.error(err);
    }
  };

  fetchStreak();
}, []);

const [selectedDate,setSelectedDate]=useState(new Date());

const handleDate=(date:Date)=>{

     const clickDate=new Date(date);
     const today=new Date();

     clickDate.setHours(0,0,0,0);
     today.setHours(0,0,0,0);

     if(clickDate>today){
      alert("Wanna travel to future...?");
       return;
     }

     setSelectedDate(clickDate);
}

  const fetchFoodLog=async()=>{
      const res= await api.get(`/foodLog/${selectedDate.toLocaleDateString("en-CA")}`);

       setFoodLog(res.data.foods);

  }

  useEffect(()=>{
     fetchFoodLog();
  },[selectedDate])

console.log(selectedDate);

const proteinGoal =currWeight === "" ? 0 : Math.round(currWeight * 1.8);


  useEffect(()=>{
     localStorage.setItem("foodDraft",JSON.stringify(foodLog))
  },[foodLog])

  useEffect(()=>{
    if(currWeight==""){
      localStorage.removeItem("weD");
    }
    else{
        localStorage.setItem("weD",JSON.stringify(currWeight))
    }
  },[currWeight])

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

{/*calculations*/}
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

const totalCal=foodLog.reduce(
  (sum,item)=>sum+item.calories,0
)
 
const deleteFood=(id:string)=>{
       setFoodLog((e)=>e.filter((item)=>item.foodId!==id));
}

  const addFood=()=>{
     if(!selectedOption||!quant) return alert('Choose');

     const food=selectedOption.data;
     const quantity=Number(quant);
const existingFood = foodLog.find(
  (item) => String(item.foodId) === String(food.id)
);

if (existingFood) {
  setFoodLog((prev) =>
    prev.map((item) => {
      if (String(item.foodId) !== String(food.id)) return item;

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
        foodId: String(food.id),
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
}

setSelectedOption(null)
setQuant("");
      
  }
  
 const startEdit = (item: FoodLog) => {
  setEditingId(item.foodId);
  setEditQuantity(item.quantity.toString());
};

  const saveEdit=()=>{
       
    if(!editingId||editingId===null) return;

    const quantity=Number(editQuantity);

    if (quantity <= 0) {
    alert("Quantity must be greater than 0");
    return;
  }

     setFoodLog((e)=>e.map((item)=>{
         if(item.foodId!==editingId){
          return item;
         }
         else{

    const food = Fdata.find((e) => e.id === Number(item.foodId));

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


const handleSave = async () => {
  try {
    await api.post("/save", {
      date: selectedDate.toLocaleDateString("en-CA"),
      foods: foodLog
    });

    alert("Saved Successfully✅");
  }
  catch(err:any){
    alert(err.response?.data?.message || "Save failed");
  }
}

 const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#171717",
    borderColor: state.isFocused ? "#f97316" : "#404040",
    boxShadow: state.isFocused ? "0 0 0 1px #f97316" : "none",
    "&:hover": {
      borderColor: "#f97316",
    },
    borderRadius: "12px",
    minHeight: "48px",
    color: "white",
  }),

  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#171717",
    borderRadius: "12px",
    overflow: "hidden",
  }),

  option: (provided: any, state: any) => ({
  ...provided,
  backgroundColor: state.isSelected
    ? "#f97316"
    : state.isFocused
    ? "rgba(249, 115, 22, 0.18)"
    : "#171717",
  color: "white",
  cursor: "pointer",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: state.isFocused
    ? "1px solid rgba(249, 115, 22, 0.35)"
    : "1px solid transparent",
  transition: "all 0.2s ease",
}),

  singleValue: (provided: any) => ({
    ...provided,
    color: "white",
  }),

  input: (provided: any) => ({
    ...provided,
    color: "white",
  }),

  placeholder: (provided: any) => ({
    ...provided,
    color: "#9ca3af",
  }),

  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? "#f97316" : "#9ca3af",
    "&:hover": {
      color: "#f97316",
    },
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};


  return (

<div className="min-h-screen w-full overflow-x-hidden bg-[#0B0707] text-white">
  <div className="w-full px-2 py-4 pb-24 sm:px-3 sm:py-6 lg:px-4 lg:py-8">
    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-6">
      
      <div className="order-1 space-y-4 sm:space-y-6 lg:col-span-4 lg:order-0">
        <div className="order-1 rounded-2xl border border-white/10 bg-[#171717] p-3 sm:rounded-3xl sm:p-6">
          <Calendar onClickDay={handleDate} value={selectedDate}  />
        </div>

        <div className="order-4 rounded-2xl border  border-white/10 bg-[#171717] p-3 sm:rounded-3xl sm:p-6">
          <div className="flex flex-row gap-3 sm:flex-1 sm:items-center">
            <div className="w-full sm:flex-1">
              <Select
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
                styles={customStyles}
              />
            </div>

            <div className="w-full sm:w-24">
              <Input
                placeholder="Qty"
                value={quant}
                onChange={(e) => setQuant(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={addFood}
              className="
                w-full
                rounded-xl
                bg-linear-to-r from-orange-500 to-amber-500
                py-3
                text-lg
                font-semibold
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-xl
                hover:shadow-orange-500/20
                hover:brightness-105
                hover:from-orange-600
                hover:to-orange-400
                active:scale-95
                active:shadow-md
                focus:outline-none
                focus:ring-2
                focus:ring-orange-500/30
                sm:w-56
              "
            >
              + Add Food
            </button>
          </div>
        </div>

        <div className="order-5 rounded-3xl border border-white/10 bg-[#171717] p-6">

  {/* Header */}
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold text-white">
        🎯 Today's Goals
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Stay consistent and keep your streak alive.
      </p>
    </div>

    <div className="text-right">
    <p className="text-xs uppercase tracking-wide text-gray-500">
        Streak
    </p>

    <h2 className="flex items-center justify-end gap-2 text-3xl font-bold text-orange-400">
        🔥 {streak}
    </h2>

    <p className="text-sm text-gray-400">
        {streak === 1 ? "Day" : "Days"}
    </p>
</div>
  </div>

  {/* Goals */}
  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

    <div className="rounded-2xl bg-[#202020] p-4 transition hover:border hover:border-green-500/30">
      <p className="text-sm text-gray-400">
        Protein
      </p>

      <h3 className="mt-2 text-3xl font-bold text-green-400">
        🥩 {totalProtein.toFixed(0)}
        <span className="text-lg text-green-300">
          /{proteinGoal}g
        </span>
      </h3>
    </div>

    <div className="rounded-2xl bg-[#202020] p-4 transition hover:border hover:border-orange-500/30">
      <p className="text-sm text-gray-400">
        Calories
      </p>

      <h3 className="mt-2 text-3xl font-bold text-orange-400">
        🔥 {totalCal.toFixed(0)}
        <span className="text-lg text-orange-300">
          /{calorieGoal}
        </span>
      </h3>
    </div>

  </div>

</div>
      </div>

      <div className="order-2 space-y-4 sm:space-y-6 lg:col-span-8 lg:order-0">
        <div className="order-2 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <div className="flex h-80 items-center justify-center rounded-2xl border border-white/10 bg-[#171717] p-3 sm:h-90 sm:rounded-3xl sm:p-6">
            <ProtienChart consumed={totalProtein} goal={proteinGoal} />
          </div>

          <div className="flex h-80 items-center justify-center rounded-2xl border border-white/10 bg-[#171717] p-3 sm:h-90 sm:rounded-3xl sm:p-6">
            <MacroChart protein={totalProtein} carbs={totalCarbs} fat={totalFat} />
          </div>
        </div>
       

        <div className="order-6 flex flex-col gap-6  rounded-2xl border border-white/10 bg-[#171717] p-3 sm:rounded-3xl sm:p-6">
              <div className="flex justify-end">

                <button onClick={handleSave}   className="w-32 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 hover:scale-105  active:scale-95 transition">
                   Save
                 </button>
                 
               </div>
          {foodLog.length === 0 ? (
            <p className="text-gray-400">No food added yet.</p>
          ) : (
            <div className="max-h-[420px] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {foodLog.map((item, index) => {
                       console.log(item);
                  return(<div
                  key={item.id ?? item.foodId ?? index}
                  className="
                    w-full
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
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="flex items-center gap-2 font-semibold text-white">
                        <span className="text-2xl">{item.emoji}</span>
                        {item.name}
                      </h3>

                      {editingId === item.foodId ? (
                        <>
                          <Input placeholder="update" value={editQuantity} onChange={(e) => setEditQuantity(e.target.value)} />
                        </>
                      ) : (
                        <>
                          {item.quantity} {item.unit}
                        </>
                      )}
                    </div>

                    <div className="flex gap-1">
                      {editingId === item.foodId ? (
                        <>
                          <button onClick={saveEdit} className="rounded-lg w-10 pb-2 text-2xl text-gray-400 transition hover:bg-orange-500/20 hover:text-orange-400">
                            ✔️
                          </button>
                          <button onClick={() => { setEditingId(null); setEditQuantity(""); }} className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/20 hover:text-red-400">
                            ❌
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-orange-500/20 hover:text-orange-400"
                            onClick={() => startEdit(item)}
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/20 hover:text-red-400"
                            onClick={() => deleteFood((item.foodId))}
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="my-4 h-px bg-white/10" />

                  <div className="flex justify-between">
                    <div className="flex flex-1 flex-col items-center">
                      <span className="text-shadow-xs">🥩</span>
                      <p className="text-lg font-semibold text-orange-400">{item.protein} g</p>
                      <p className="text-xs text-gray-500">Protein</p>
                    </div>

                    <div className="w-px bg-white/10"></div>

                    <div className="flex flex-1 flex-col items-center">
                      <span className="text-2xs">🍚</span>
                      <p className="text-lg font-semibold text-yellow-400">{item.carbs} g</p>
                      <p className="text-xs text-gray-500">Carbs</p>
                    </div>
                  </div>
                         </div>)
                
                    })}
              </div>
            </div>
          )}
         
        </div>


      </div>
    </div>

    <BottomNavbar />
  </div>
</div>

  );
}