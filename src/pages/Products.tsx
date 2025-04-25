import { useEffect } from 'react';
import { useProduct } from '../context/Product';
import Search from '../components/Search';
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom';
import Product from '@/components/Product';

export default function Products() {
    const { fetchProducts,handleSearch } = useProduct();
  
    useEffect(()=>{
      fetchProducts();
    }, [])
  

  return (
    <div className='p-[1rem] flex flex-col gap-8 md:mt-[3rem] mb-[5rem]'>
      <h1 className='text-2xl font-medium'>Products</h1>
        <div className='flex items-center gap-4'>
          <Search onSearch={handleSearch} placeholder="Search for Products..."/>
          <button className='hover:scale-115 hover:rotate-180 hover:bg-[#9afc49] hover:text-zinc-950 flex gap-2 items-center justify-center bg-zinc-950 text-white p-2 rounded'><Link to='/create'><IoMdAdd /></Link></button>
        </div>

        <Product />

      
    </div>
  )
}