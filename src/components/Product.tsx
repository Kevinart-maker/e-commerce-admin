import { useEffect } from 'react';
import { useProduct } from '../context/Product';
import ProductList from '../components/ProductList';

export default function Product() {
    const { products, searchResults, fetchProducts, loading, error } = useProduct();
  
    useEffect(()=>{
      fetchProducts();
    }, [])
  
    const resultsToDisplay = searchResults.length > 0 ? searchResults : products;

    
  return (
    <div>
      
      <div className='bg-gray-50 rounded text-sm p-2 md:hidden flex flex-col gap-4'>
        {resultsToDisplay.map((product) => (
          <ProductList product={product} key={product._id} />
        ))}
        </div>

      <section className='bg-gray-50 rounded text-sm p-2 md:block hidden'>
        <table className="md:table min-w-full">
          <thead className="bg-gray-50 rounded-md">
            <tr>
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
      </section>
        
        { error && (<span className='px-[1rem] py-[0.3rem] text-xs text-red-500 bg-red-100 border border-red-500 w-fit rounded'>{error}</span>) }

    </div>
  )
}
