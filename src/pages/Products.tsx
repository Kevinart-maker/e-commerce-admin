import { useEffect, useMemo } from 'react';
import { useProduct } from '../context/Product';
import Search from '../components/Search';
import ProductList from '../components/ProductList';
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function Products() {
    const { products, searchResults, fetchProducts, loading, error, handleSearch } = useProduct();
  
    useEffect(()=>{
      fetchProducts();
    }, [])
  
    const resultsToDisplay = searchResults.length > 0 ? searchResults : products;


  return (
    <div className='p-[1rem] flex flex-col gap-8 md:mt-[3rem] mb-[5rem]'>
      <h1 className='text-2xl font-medium'>Products</h1>
        <div className='flex items-center gap-4'>
          <Search onSearch={handleSearch} placeholder="Search for Products..."/>
          <button className='hover:scale-115 hover:rotate-180 hover:bg-[#9afc49] hover:text-zinc-950 flex gap-2 items-center justify-center bg-zinc-950 text-white p-2 rounded'><Link to='/create'><IoMdAdd /></Link></button>
        </div>

        <div className='bg-gray-50 rounded text-sm p-2 md:hidden flex flex-col gap-4'>
        {resultsToDisplay.map((product) => (
          <ProductList product={product} key={product._id} />
        ))}
        </div>

      <div className='bg-gray-50 rounded text-sm p-2 md:block hidden'>
        <table className="md:table min-w-full">
          <thead className="bg-gray-50 rounded-md">
            <tr>
              {/* <th className="font-normal px-4 py-2 text-left">Image</th> */}
              <th className="font-normal py-2 text-left">Name</th>
              <th className="font-normal py-2 text-left">Price</th>
              <th className="font-normal py-2 text-left">Brand</th>
              <th className="font-normal py-2 text-left">Category</th>
              <th className="font-normal py-2 text-left">Stock</th>
              <th className="font-normal py-2 text-left"><span className='sr-only'>Edit</span></th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200 text-xs'>
            {loading ? (
              <tr>
          <td colSpan={6} className="text-center text-xl font-medium py-4">
            Loading...
          </td>
              </tr>
            ) : (
              resultsToDisplay.map((product) => (
          <ProductList product={product} key={product._id} />
              ))
            )}
          </tbody>
        </table>
      </div>
        
        { error && (<span className='px-[1rem] py-[0.3rem] text-xs text-red-500 bg-red-100 border border-red-500 w-fit rounded'>{error}</span>) }

      
    </div>
  )
}