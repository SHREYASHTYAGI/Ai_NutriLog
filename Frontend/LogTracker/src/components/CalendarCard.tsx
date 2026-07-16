import { useState } from "react";
import Calendar from "react-calendar";

export default function CalendarCard() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="rounded-[28px] border border-white/10 bg-[#0f0f10]/80 p-5 shadow-[0_20px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Schedule</p>
          <h2 className="text-xl font-semibold text-white">Calendar</h2>
        </div>
      </div>

      <div className="mx-auto w-full max-w-140">
        <Calendar
          onChange={(value) => {
            if (value instanceof Date) {
              setSelectedDate(value);
            }
          }}
          value={selectedDate}
          className="w-full"
        />
      </div>
    </div>
  );
}