import ProductForm, { ProductFormInputs } from "../components/Form";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateProduct() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [msg, setMsg] = useState<string | null>(null);

  const handleCreate = async (data: ProductFormInputs) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("category", data.category);
    formData.append("brand", data.brand);
    formData.append("stock", data.stock.toString());

    if (data.images) {
      Array.from(data.images).forEach((file) => formData.append("images", file));
    }

    try{

        const { data } = await axios.post('https://etemplate-backend.vercel.app/api/products', formData,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        console.log('Product created successfully: ', data);
        setLoading(false);
        setError(null);
        setMsg('Product created!')
      } catch (err){
        console.error('Error: ', err);
        setLoading(false);
        setError('Failed to create product');
      }
  };

  return (
    <div className="p-4 flex flex-col gap-[3rem] md:mt-[3rem]">
      <h1 className="font-medium text-xl text-zinc-950"><Link to='/products' className="hover:underline text-2xl">Products</Link> /  Create</h1>
      <ProductForm loading={loading} onSubmit={handleCreate} />
      {error && (
        <p className="px-[1rem] py-[0.3rem] text-xs text-red-500 bg-red-100 border border-red-500 w-fit rounded">
          {error}
        </p>
      )}
      {msg && (
        <p className="px-[1rem] py-[0.3rem] text-xs text-green-500 bg-green-100 border border-green-500 w-fit rounded">
          {msg}
        </p>
      )}
    </div>
  );
}