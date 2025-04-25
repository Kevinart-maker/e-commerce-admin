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
            </div>
          </td>
        </tr>
  )
})

export default ProductList;