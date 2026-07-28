import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Home,
  BarChart3,
  Bot,
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
        name:"Coach",
        path:"/streaks",
        icon:Bot
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
                     bottom-2
                     left-1/2
                     z-50
                     w-[90%]
                     max-w-xl
                     max-sm:w-[95%]
                     -translate-x-1/2
                     
                     rounded-full
                     border
                     border-white/10
                     bg-[#181818]/90
                     backdrop-blur-xl
                     sm:w-full
                     px-2
                     sm:px-3
                     py-2
                     
                     flex
                     items-center
                     justify-between
                     gap-1
                     
                     shadow-amber-100
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
        title="Logout"
      >
        <Icon size={20} />
        <span className="hidden sm:inline">{item.name}</span>
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
            title={item.name}
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