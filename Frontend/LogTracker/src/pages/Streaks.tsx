import api from "../api/axios"
import BottomNavbar from "../components/BottomNavbar";


const handleGenerate = async () => {
  try {
    const res = await api.post("/analysis");

    console.log(res.data.report);
  } catch (err) {
    console.log(err);
  }
};

export default function Streaks(){
     return (
      <> 
          <button
            onClick={handleGenerate}
            className="rounded-xl bg-orange-500 px-5 py-3 text-white"
          >
            Generate Report
          </button>
             <BottomNavbar/>
      </>
        
 )
}