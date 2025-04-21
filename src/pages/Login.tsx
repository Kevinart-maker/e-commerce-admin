import { useState } from 'react';
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import { IoMdMail } from "react-icons/io";
import { MdOutlinePassword } from "react-icons/md";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);

    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      setLoading(false);
      navigate('/'); // Redirect to the dashboard or home page
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="p-6 m-[3rem] flex flex-col md:gap-6 gap-[3rem] bg-[#f7f9fa] rounded md:mt-[5rem]">
      <h1 className='font-medium text-2xl text-zinc-950'>Log In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 text-sm'>
        <div className='flex items-center gap-2 border border-[#d1d2d3] bg-white rounded w-full p-[0.3rem] '>
          <IoMdMail />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='enter email'
            className='w-full outline-none'
          />
        </div>
        <div className='border border-[#d1d2d3] bg-white rounded w-full p-[0.3rem] flex items-center gap-2'>
          <MdOutlinePassword />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='enter password'
            className="w-full outline-none"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className='w-fit flex self-center px-[1rem] py-[0.3rem] rounded font-medium bg-zinc-950 text-white hover:bg-zinc-900 hover:scale-125 cursor-pointer' type="submit">{loading ? 'logging in..' : 'Login'}</button>
      </form>
    </div>
  );
}