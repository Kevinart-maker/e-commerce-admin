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
    <div className="p-4 flex flex-col gap-[3rem]">
      <h1 className="font-bold text-xl text-[#1b1b1bf3]"><Link to='/' className="underline text-3xl">Products</Link> /  Create</h1>
      <ProductForm loading={loading} onSubmit={handleCreate} />
      {error && <p className="text-red-500">{error}</p>}
      {msg && <p className="text-green-500">{msg}</p>}
    </div>
  );
}