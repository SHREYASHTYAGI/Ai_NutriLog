import BottomNavbar from "../components/BottomNavbar";

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#0B0707] text-white flex items-center justify-center">
      <h1 className="text-5xl font-bold">Profile</h1>

      <BottomNavbar/>
    </div>
  );
}