import { NavLink } from "react-router-dom";
import { TbDashboardFilled } from "react-icons/tb";
import { AiFillProduct } from "react-icons/ai";
import { IoMail } from "react-icons/io5";
import { useAuth } from '../context/Auth'
import { FiLogOut } from "react-icons/fi";
import { HiUsers } from "react-icons/hi2";

export default function Nav() {
  const { user, logout } = useAuth();


  return (
    <nav className="z-50 bg-zinc-950 md:h-[100vh] md:w-[15rem] px-6 py-[2rem] text-white flex flex-col gap-8">
        <div className='text-xl font-bold w-full custom-font whitespace-nowrap'>Nivek Techs</div>

        {
          user && (
            <ul className="flex md:flex-col flex-row justify-center md:text-sm text-3xl gap-6 py-2 bg-zinc-950 md:static fixed bottom-0 left-0 right-0">
              <NavLink to='/' className="p-[0.2rem] px-[0.5rem] hover:bg-[#9afc49] rounded hover:text-zinc-950 flex gap-2 items-center hover:scale-115"><TbDashboardFilled /> <span className="md:block hidden">Dashboard</span></NavLink>
              <NavLink to='/products' className="p-[0.2rem] px-[0.5rem] hover:bg-[#9afc49] rounded hover:text-zinc-950 flex gap-2 items-center hover:scale-115"><AiFillProduct /> <span className="md:block hidden">Products</span></NavLink>
              <NavLink to='/users' className="p-[0.2rem] px-[0.5rem] hover:bg-[#9afc49] rounded hover:text-zinc-950 flex gap-2 items-center hover:scale-115"><HiUsers /> <span className="md:block hidden">Users</span></NavLink>
              <NavLink to='/inbox' className="p-[0.2rem] px-[0.5rem] hover:bg-[#9afc49] rounded hover:text-zinc-950 flex gap-2 items-center hover:scale-115"><IoMail /> <span className="md:block hidden">Inbox</span></NavLink>

              <div className="p-[0.2rem] px-[0.5rem] hover:bg-[#9afc49] rounded hover:text-zinc-950 flex gap-2 items-center cursor-pointer hover:scale-115" onClick={()=> logout()}><FiLogOut /> <span className="md:block hidden">Logout</span></div>

            </ul>
          )
        }
    </nav>
  )
}