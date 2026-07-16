import { NavLink } from "react-router-dom";
import {
  Home,
  BarChart3,
  Flame,
  User,
} from "lucide-react";


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
    }
]

export default function BottomNavbar(){

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

    return (
      <NavLink key={item.path} to={item.path}>
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