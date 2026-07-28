import { useState } from "react";
import { Sparkles, LoaderCircle } from "lucide-react";
import api from "../api/axios";
import BottomNavbar from "../components/BottomNavbar";
import AIScanner from "./AIScanner";

export default function Streaks() {
const [answer, setAnswer] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const res = await api.post("/analysis");

      setAnswer(JSON.parse(res.data.report));
      console.log(res.data.report);

    } catch (err) {
      console.log(err);
      setAnswer("Failed to generate report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09070c] text-white px-5 py-8 pb-24">

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
          AI Reports
        </p>

        <h1 className="mt-2 text-4xl font-semibold">
          Health Reports
        </h1>

        <p className="mt-2 text-slate-400">
          Generate an AI-powered analysis of your nutrition habits.
        </p>
      </div>


      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="
          flex w-2xs items-center justify-center gap-3
          rounded-2xl bg-orange-500 
          px-6 py-4
          font-semibold
          transition
          hover:bg-orange-600
          disabled:opacity-50
        "
      >
        {loading ? (
          <>
            <LoaderCircle className="animate-spin" size={20}/>
            Generating...
            <AIScanner/>
          </>
        ) : (
          <>
            <Sparkles size={20}/>
            Generate Report
          </>
        )}
      </button>


      {/* AI Response Card */}
      {answer && (
  <div className="space-y-5 mt-8">

    <div className="rounded-2xl bg-white/10 p-6">
      <h2 className="text-xl font-bold">
        Nutrition Score
      </h2>

      <p className="text-5xl text-orange-400 font-bold">
        {`${answer.score}/10`}
      </p>

      <p className="mt-3 text-gray-300">
        {answer.summary}
      </p>
    </div>


    <div className="rounded-2xl bg-green-500/10 p-6">
      <h2 className="text-xl font-bold">
        Strengths
      </h2>

      {answer.strengths.map((item:string, index:number)=>(
        <p key={index}>
          ✅ {item}
        </p>
      ))}
    </div>


    <div className="rounded-2xl bg-red-500/10 p-6">
      <h2 className="text-xl font-bold">
        Weaknesses
      </h2>

      {answer.weaknesses.map((item:string, index:number)=>(
        <p key={index}>
          ⚠️ {item}
        </p>
      ))}
    </div>


    <div className="rounded-2xl bg-orange-500/10 p-6">
      <h2 className="text-xl font-bold">
        Recommendations
      </h2>

      {answer.recommendations.map((item:string,index:number)=>(
        <p key={index}>
          🚀 {item}
        </p>
      ))}
    </div>


    <div className="rounded-2xl bg-purple-500/10 p-6">
      <h2 className="text-xl font-bold">
        Motivation
      </h2>

      <p>
        {answer.motivation}
      </p>
    </div>

  </div>
)}

      <BottomNavbar />

    </div>
  );
}