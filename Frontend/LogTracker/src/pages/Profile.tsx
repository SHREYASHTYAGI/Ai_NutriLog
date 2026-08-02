import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import BottomNavbar from "../components/BottomNavbar";

import {
  Mail,
  Weight,
  Ruler,
  Flame,
  Target,
  KeyRound,
  LogOut,
  type LucideIcon,
} from "lucide-react";

type ProfileItemProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

function ProfileItem({ icon: Icon, label, value }: ProfileItemProps) {
  return (
    <div className="flex items-center justify-between py-4 transition-all duration-300 hover:scale-[1.01]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-400">
          <Icon size={18} />
        </div>

        <div>
          <p className="text-sm text-zinc-500">{label}</p>
          <p className="text-base font-medium text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

type GoalPillProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

function GoalPill({ icon: Icon, label, value }: GoalPillProps) {
  return (
    <div className="flex items-center justify-between rounded-full bg-[#171717] px-5 py-4 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-400">
          <Icon size={18} />
        </div>

        <span className="text-sm text-zinc-300">{label}</span>
      </div>

      <span className="rounded-full bg-orange-500/15 px-4 py-2 text-sm font-bold text-orange-400">
        {value}
      </span>
    </div>
  );
}



export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUser();
  }, []);

const handlePass = () => {
    navigate("/new-pass");
};

  const fetchUser = async () => {
    try {
      const res = await api.get("/getme");
      setUser(res.data.user);
    } catch (err: any) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout");

      localStorage.removeItem("foodDraft");
      localStorage.removeItem("weD");

      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const proteinGoal = user?.weight ? Math.round(user.weight * 1.8) : 0;

  const calorieGoal = user?.weight ? Math.round(user.weight * 35) : 0;

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="min-h-screen bg-[#0B0707] pb-28 text-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="relative overflow-hidden py-4">

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-base text-zinc-400 text-lg">
                <b>{greeting},</b>
              </p>

              <h1 className=" mb-4  text-2xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {user?.name || "Your Profile"}
              </h1>

              <p className="mt-3 text-sm text-zinc-500 sm:text-base">
                Keep crushing your nutrition goals
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-full bg-orange-500/10 px-5 py-3 text-sm font-semibold text-orange-300">
                Best Streak: {user?.maxStreak ?? 0} Days
              </div>

              <div className="rounded-full bg-[#171717] px-5 py-3 text-sm text-zinc-300">
                Daily Focus: Nutrition Consistency
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <section>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
                Account
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Profile Information
              </h2>
            </div>

            <div className="divide-y divide-white/5">
              <ProfileItem
                icon={Mail}
                label="Email"
                value={user?.email || "Not available"}
              />

              <ProfileItem
                icon={Weight}
                label="Weight"
                value={user?.weight ? `${user.weight} kg` : "Not available"}
              />

              <ProfileItem
                icon={Ruler}
                label="Height"
                value={user?.height ? `${user.height} cm` : "Not available"}
              />
            </div>
          </section>

          <section>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
                Performance
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Daily Performance
              </h2>
            </div>

            <div className="space-y-4">
              <GoalPill
                icon={Target}
                label="Protein Goal"
                value={`${proteinGoal} g/day`}
              />

              <GoalPill
                icon={Flame}
                label="Calorie Goal"
                value={`${calorieGoal} kcal/day`}
              />

              <div className="pt-4">
                <p className="text-sm text-zinc-500">Best Streak</p>

                <div className="mt-2 flex items-end gap-3">
                  <span className="text-5xl font-bold tracking-tight text-white">
                    {user?.maxStreak ?? 0}
                  </span>
                  <span className="pb-1 text-lg text-orange-400">Days</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row lg:justify-end">
          <button  onClick={handlePass} className="flex items-center justify-center gap-2 rounded-full bg-[#171717] px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:text-orange-400">
            <KeyRound size={18} />
            Change Password
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-full bg-red-500/10 px-6 py-4 font-semibold text-red-400 transition-all duration-300 hover:scale-105 hover:bg-red-500/20 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
}