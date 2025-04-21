import { useProduct } from "../context/Product";
import ProductForm, { ProductFormInputs } from "../components/Form";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const { products } = useProduct();
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<ProductFormInputs | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const product = products.find((p) => p._id === id);
    if (product) {
      setInitialValues({
        _id: id ?? "",
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        brand: product.brand,
        stock: product.stock,
        reviews: product.reviews,
      });
    }
  }, [id, products]);

  const handleUpdate = async (data: ProductFormInputs) => {
    setLoading(true);
    setError(null);
    setMsg(null);

    const product = products.find((p) => p._id === id);
    const formData = new FormData();

    formData.append("_id", id ?? "");
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("category", data.category);
    formData.append("brand", data.brand);
    formData.append("stock", data.stock.toString());
    formData.append("reviews", JSON.stringify(data.reviews));

    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => formData.append("images", file));
    } else if (product?.images && product.images.length > 0) {
      // If no new images are provided, keep the existing images
      product.images.forEach((image) => formData.append("images", image));
    }

    try {
      const response = await fetch(`https://etemplate-backend.vercel.app/api/products/${id}`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const result = await response.json();
      console.log("Product updated successfully: ", result);
      setMsg("Product updated!");
    } catch (err) {
      console.error("Error: ", err);
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div className="p-4 flex flex-col gap-[3rem] md:mt-[3rem]">
      <h1 className="font-medium text-xl text-zinc-950"><Link to='/products' className="hover:underline text-2xl">Products</Link> /  Update</h1>
      <ProductForm loading={loading} initialValues={initialValues} onSubmit={handleUpdate} />
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