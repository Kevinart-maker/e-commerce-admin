import { useProduct } from "../context/Product";
import { CiTrash } from "react-icons/ci";
import Review from "./Review";
import React from "react";
import { Link } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi2";

interface Review {
  user: string;
  comment: string;
  rating: number;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  images: string[];
  reviews: Review[];
}

const ProductList = React.memo(({ product }: { product: Product }) => {
    const { deleteProduct } = useProduct();

    const handleDelete = () => {
        deleteProduct(product._id);
    }
    
  return (

        <tr className="md:static relative bg-white p-2">
          <td className="overflow-hidden px-4 p-[0.4rem] flex items-center gap-4 bg-white"><img src={product.images[0]} alt={product.name} className="w-[3.5rem]"/> <span>{product.name}</span></td>
          <td className="p-[0.4rem] bg-white">${product.price.toFixed(2)}</td> 
          <td className="p-[0.4rem] bg-white">{product.brand}</td>
          <td className="p-[0.4rem] bg-white">{product.category}</td>
          <td className="p-[0.4rem] bg-white">{product.stock}</td>
          <td className="p-[0.4rem] bg-white">
            <div className="flex items-center gap-4 md:static absolute top-2 right-2">
              <div className="border border-gray-100 p-2 rounded hover:bg-gray-100">
                <CiTrash onClick={handleDelete} className="text-xl hover:scale-115 cursor-pointer"/>
              </div>
              <Link to={`/update/${product._id}`} className="border border-gray-100 p-2 rounded hover:bg-gray-100"><HiOutlinePencil className="text-xl hover:scale-115 cursor-pointer "/></Link>
              {/* <IoMdArrowDropdown onClick={()=> setShow(!show)} className="text-xl hover:scale-200 hover:rotate-360 cursor-pointer"/> */}
            </div>
          </td>
        </tr>
    
    // <div key={product._id} className={`p-2 border-b-[1px] relative border-gray-300 flex flex-col gap-6 ${show ? 'h-full' : 'h-[6rem] overflow-hidden'}`}>
    //   <div className="flex items-center justify-between w-ful text-sm">
    //     <div className="flex items-center gap-6 w-full">
    //         <img src={product.images[0]} alt={product.name} className="w-[5rem]"/>
    //         <h1 className="text-xl font-medium">{product.name}</h1>
    //         <p className='flex items-center gap-2+'><TbCurrencyNaira /> <span>{product.price}</span></p>
    //         <p>{product.brand}</p>
    //         <p>{product.category}</p>
    //         <p>{product.stock}</p>
    //     </div>

    //     <IoMdArrowDropdown onClick={()=> setShow(!show)} className="text-xl hover:scale-200 hover:rotate-360"/>

    //     <RiDeleteBin4Fill onClick={handleDelete} className="absolute bottom-4 right-4 hover:scale-115 hover:text-[#9afc49]"/>
    //   </div>

      
    //   <div className={`self-center flex gap-[4rem] `}>
    //       <div>
    //         <h1 className="text-2xl font-semibold">Description</h1>

    //         <p>{product.description}</p>
    //       </div>
    //       <div>
    //         <h1 className="text-2xl font-semibold">Reviews . {product.reviews.length}</h1>
    //         {product.reviews.map((review) => (
    //           <div key={review.user} className="flex flex-col gap-2 p-4">
    //             <h1 className="text-lg font-medium">{review.user}</h1>
    //             <p>{review.comment}</p>
    //             <p>
    //               <StarRatings
    //                 rating={review.rating}
    //                 starRatedColor="black"
    //                 numberOfStars={5}
    //                 name='rating'
    //                 starDimension="10px"
    //                 starSpacing="2px"
    //               />
    //             </p>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    // </div>
  )
})

export default ProductList;