import { NavLink } from "react-router-dom";
import { TbDashboardFilled } from "react-icons/tb";
import { AiFillProduct } from "react-icons/ai";
import { IoMail } from "react-icons/io5";
import { useAuth } from '../context/Auth'
import { FiLogOut } from "react-icons/fi";
import { HiOutlinePencil, HiUsers } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";

export default function Nav() {
  const { user, logout, toggleVisible } = useAuth();

  return (
    <nav className="z-50 bg-zinc-950 md:h-[100vh] md:w-[15rem] px-6 py-[2rem] text-white flex flex-col gap-8">
        <header className="flex justify-between items-center">
          <div className='text-xl font-bold w-full custom-font whitespace-nowrap'>Nivek Techs</div>
          { user && (
            <div onClick={() => toggleVisible()} className="p-[0.2rem] px-[0.5rem] flex md:hidden md:justify-between gap-4 items-center">
                <div className="flex gap-2 items-center">
                  {
                    user.image ? <span className="w-8 h-8 rounded-[100%] overflow-hidden flex items-center justify-center" ><img src={user.image} alt="user" className="max-w-[150%]"/></span> : <FaUserCircle className="text-[2rem]"/>
                  } 
                </div>
            </div>
          )}
        </header>

        {
          user && (
            <ul className="flex md:flex-col flex-row justify-center md:text-sm text-3xl gap-6 py-2 bg-zinc-950 md:static fixed bottom-0 left-0 right-0">
              <NavLink to='/' className="p-[0.2rem] px-[0.5rem] hover:bg-[#9afc49] rounded hover:text-zinc-950 flex gap-2 items-center hover:scale-115"><TbDashboardFilled /> <span className="md:block hidden">Dashboard</span></NavLink>
              <NavLink to='/products' className="p-[0.2rem] px-[0.5rem] hover:bg-[#9afc49] rounded hover:text-zinc-950 flex gap-2 items-center hover:scale-115"><AiFillProduct /> <span className="md:block hidden">Products</span></NavLink>
              <NavLink to='/users' className="p-[0.2rem] px-[0.5rem] hover:bg-[#9afc49] rounded hover:text-zinc-950 flex gap-2 items-center hover:scale-115"><HiUsers /> <span className="md:block hidden">Users</span></NavLink>
              <NavLink to='/inbox' className="p-[0.2rem] px-[0.5rem] hover:bg-[#9afc49] rounded hover:text-zinc-950 flex gap-2 items-center hover:scale-115"><IoMail /> <span className="md:block hidden">Inbox</span></NavLink>
              
              <div className="p-[0.2rem] px-[0.5rem] md:justify-between gap-6 items-center hidden md:flex">
                <div className="flex gap-2 items-center">
                  {
                    user.image ? <img src={user.image} alt="user" className="w-8 h-8 object-cover rounded-full" /> : <FaUserCircle className="text-[2rem]"/>
                  } 
                  <span className="md:block hidden">{user.name}</span>
                </div>
                <div onClick={() => toggleVisible()}><HiOutlinePencil className="text-xs hover:scale-115 cursor-pointer "/></div>
              </div>

              <div className="p-[0.2rem] px-[0.5rem] hover:bg-[#9afc49] rounded hover:text-zinc-950 flex gap-2 items-center cursor-pointer hover:scale-115" onClick={()=> logout()}><FiLogOut /> <span className="md:block hidden">Logout</span></div>

            </ul>
          )
        }
    </nav>
  )
}