import { useEffect, useState } from 'react';
import { useProduct } from '../context/Product';
import Search from '../components/Search';
import ProductList from '../components/ProductList';
import axios from 'axios';
import { HiUsers } from 'react-icons/hi2';
import { IoMdTrendingUp } from "react-icons/io";


export default function Dashboard() {
  const { products, searchResults, fetchProducts, loading, error, handleSearch } = useProduct();
  const [stats, setStats] = useState<any>([]);

  useEffect(()=>{
    const fetchStats = async () => {
      const res = await axios.get('https://etemplate-backend.vercel.app/api/user/stats', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setStats(res.data);
    };
    fetchStats();
    fetchProducts();
  }, [])

  const resultsToDisplay = searchResults.length > 0 ? searchResults : products;
    
  return (
    <div className='p-[1rem] flex flex-col gap-8 md:mt-[3rem]'>
      
      <h1 className="font-medium text-2xl text-zinc-950">
          Dashboard
      </h1>
    {
      stats ? (
        <div className='rounded-[1rem] p-4 shadow text-xs flex flex-col gap-4 text-[#6a6b6b] md:w-fit'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='flex flex-col gap-2'><span>Total User</span> <span className='text-2xl text-zinc-950'>{stats.total}</span></p>
            </div>
            <span className='text-3xl text-[#9afc49] bg-[#ebf5e3] p-2 rounded-[50%]'><HiUsers /></span>
          </div>
          <p className={`flex justify-between md:gap-[2rem] items-center`}>
            <span className='flex gap-1 items-center'> 
              <span className={`flex items-center gap-2 ${stats.percentageChange >= 0 ? 'text-[#9afc49]' : 'text-red-600'}`}>
                <IoMdTrendingUp />
                <span>{Math.abs(stats.percentageChange)}% {stats.percentageChange >= 0 ? 'up' : 'down'}</span>
              </span><span> from yesterday</span></span>
            <span>{stats.today} {Array.isArray(stats.user) && stats.user.length > 1 ? 'Users' : 'User'} today</span>
          </p>
        </div>
      ) : 'loading..'
    }
      
      <Search onSearch={handleSearch} placeholder="Search for Products" />
      { loading ? (<div>loading..</div>) : 
        resultsToDisplay.map((product) => (
          <ProductList product={product} />
        ))
      }
      { resultsToDisplay.length === 0 && !loading && (<div className='text-center text-gray-500'>No Product Found</div>) }
      
      { error && (<span className='px-[1rem] py-[0.3rem] text-xs text-red-500 bg-red-100 border border-red-500 w-fit rounded'>{error}</span>) }

    </div>
  )
}
