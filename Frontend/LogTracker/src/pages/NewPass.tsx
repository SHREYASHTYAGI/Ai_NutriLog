import { useState } from "react";
import { KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return alert("Please fill all fields");
    }

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await api.post("/reset-pass", {
        currentPassword,
        newPassword,
      });

      alert(res.data.message);
      navigate("/profile");
    } catch (err: any) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0707] px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#171717] p-8 shadow-2xl">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/15">
            <KeyRound className="text-orange-400" size={30} />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Change Password
          </h1>

          <p className="mt-3 text-zinc-400">
            Update your account password securely.
          </p>
        </div>

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="mb-4 w-full rounded-2xl border border-white/10 bg-[#202020] px-4 py-4 text-white outline-none transition focus:border-orange-500"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mb-4 w-full rounded-2xl border border-white/10 bg-[#202020] px-4 py-4 text-white outline-none transition focus:border-orange-500"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-6 w-full rounded-2xl border border-white/10 bg-[#202020] px-4 py-4 text-white outline-none transition focus:border-orange-500"
        />

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}