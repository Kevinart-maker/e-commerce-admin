import { NavLink } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { useAuth } from '../context/Auth'
import { FiLogOut } from "react-icons/fi";

export default function Nav() {
  const { user, logout } = useAuth();


  return (
    <nav className="bg-zinc-950 md:h-[100vh] md:w-[15rem] px-6 py-[2rem] text-white flex flex-col gap-8">
        <div className='text-2xl font-bold w-full'>Nivek Techs</div>

        {
          user && (
            <ul className="flex md:flex-col flex-row justify-center md:text-sm text-2xl gap-4 bg-zinc-950 md:static fixed bottom-0 left-0 right-0">
              <NavLink to='/' className="p-[0.2rem] px-[0.5rem] hover:bg-[#9afc49] rounded hover:text-zinc-950 flex gap-2 items-center hover:scale-115"><RiHomeFill /> <span>Dashboard</span></NavLink>
              <NavLink to='/products' className="p-[0.2rem] px-[0.5rem] hover:bg-[#9afc49] rounded hover:text-zinc-950 flex gap-2 items-center hover:scale-115"><AiFillProduct /> <span>Products</span></NavLink>

              <div className="p-[0.2rem] px-[0.5rem] hover:bg-[#9afc49] rounded hover:text-zinc-950 flex gap-2 items-center cursor-pointer hover:scale-115" onClick={()=> logout()}><FiLogOut /> <span>Logout</span></div>

            </ul>
          )
        }
    </nav>
  )
}