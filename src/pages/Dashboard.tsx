import { useEffect } from 'react';
import { useProduct } from '../context/Product';
import Search from '../components/Search';
import ProductList from '../components/ProductList';


export default function Dashboard() {
  const { products, searchResults, fetchProducts, loading, error, handleSearch } = useProduct();

  useEffect(()=>{
    fetchProducts();
  }, [])

  const resultsToDisplay = searchResults.length > 0 ? searchResults : products;
    
  return (
    <div className='p-[1rem] flex flex-col gap-8'>
      <Search onSearch={handleSearch} placeholder="Search for Products" />
      { loading ? (<div>loading..</div>) : 
        resultsToDisplay.map((product) => (
          <ProductList product={product} />
        ))
      }
      { resultsToDisplay.length === 0 && !loading && (<div className='text-center text-gray-500'>No Products Found</div>) }
      
      { error && (<span className='px-[1rem] py-[0.3rem] text-xs text-red-500 bg-red-100 border border-red-500 w-fit rounded'>{error}</span>) }

    </div>
  )
}
