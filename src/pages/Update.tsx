import { useProduct } from "../context/Product";
import ProductForm, { ProductFormInputs } from "../components/Form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UpdateProduct() {
  const { products, updateProduct } = useProduct();
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<ProductFormInputs | null>(null);

  useEffect(() => {
    const product = products.find((p) => p._id === id);
    if (product) {
      setInitialValues({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        brand: product.brand,
        stock: product.stock,
      });
    }
  }, [id, products]);

  const handleUpdate = async (data: ProductFormInputs) => {
    await updateProduct({ ...data, _id: id! });
  };

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div>
      <h1>Update Product</h1>
      <ProductForm initialValues={initialValues} onSubmit={handleUpdate} />
    </div>
  );
}