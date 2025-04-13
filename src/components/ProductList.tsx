import { useProduct } from "../context/Product";
import { RiDeleteBin4Fill } from "react-icons/ri";
import Review from "./Review";
import React from "react";

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
    <div key={product._id} className="flex items-center gap-6 w-full p-2 border-b-[1px] border-gray-300 text-sm">
        <img src={product.images[0]} alt={product.name} className="w-[5rem]"/>
        <h1 className="text-xl font-medium">{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <p>{product.brand}</p>
        <p>{product.category}</p>
        <p>{product.stock}</p>

        <RiDeleteBin4Fill onClick={handleDelete} className="text-xl"/>

        <div>
          {product.reviews.map((review) => (
            <div key={review.user} className="flex flex-col gap-2 p-4 border-b-[1px] border-gray-300">
              <h1 className="text-lg font-medium">{review.user}</h1>
              <p>{review.comment}</p>
              <p>{review.rating}</p>
            </div>
          ))}
        </div>
    </div>
  )
})

export default ProductList;