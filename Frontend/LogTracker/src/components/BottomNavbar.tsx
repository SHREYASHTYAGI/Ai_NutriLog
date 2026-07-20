import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Home,
  BarChart3,
  Flame,
  User,
  LogOut,
} from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";




const navItems=[
   
    {
        name:"Home",
        path:"/dashboard",
        icon:Home
    },
    {
        name:"Progress",
        path:"/progress",
        icon:BarChart3
    },
    {
        name:"Streaks",
        path:"/streaks",
        icon:Flame
    },
    {
       name:"Profile",
       path:"/profile",
       icon:User
    },{
      name:"Logout",
      icon:LogOut
    }
]

export default function BottomNavbar(){

  const navigate=useNavigate();
  const { setIsLoggedIn } = useAuth();

    const logOut=async()=>{
      try{
           await api.post("/logout");
          setIsLoggedIn(false);
          navigate("/login");
      }
      catch(err:any){
        alert(err) 
      }
       
    }

         return(
           <nav
             className="
               fixed
               bottom-6
               left-1/2
               z-50
               -translate-x-1/2
               rounded-full
               border
               border-white/10
               bg-[#181818]/90
               px-3
               py-2
               backdrop-blur-xl
               shadow-2xl
               
               flex
               justify-between
               items-center
             "
           >
               {navItems.map((item) => {
    const Icon = item.icon;

      if(item.name==="Logout"){
         return (
      <button
        key={item.name}
         onClick={logOut}
        className="flex h-10 items-center gap-2 rounded-lg p-2 text-red-400 hover:text-red-500 transition"
      >
        <Icon size={20} />
        <span>{item.name}</span>
      </button>
    );
      }

    return (
      <NavLink key={item.name} to={item.path!}>

        {({ isActive }) => (
          <div
            className={`flex  h-10 items-center gap-2 p-2 rounded-lg ${
              isActive
                ?"text-orange-500 text-xl ":""
            }`}
          >
            <Icon size={20} />
            <span>{item.name}</span>
          </div>
        )}
      </NavLink>
    );
})}
         </nav>
    )
    
}