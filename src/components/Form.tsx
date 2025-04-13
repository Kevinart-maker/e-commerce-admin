import { useForm, SubmitHandler } from "react-hook-form";

export interface ProductFormInputs {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  images?: FileList; // For file uploads
}

interface ProductFormProps {
  loading: boolean; // Loading state for the form
  initialValues?: ProductFormInputs; // Pre-filled values for update
  onSubmit: (data: ProductFormInputs) => void; // Callback for form submission
}

const ProductForm: React.FC<ProductFormProps> = ({ loading, initialValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    defaultValues: initialValues, // Pre-fill form for updates
  });

  const handleFormSubmit: SubmitHandler<ProductFormInputs> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4 p-4 bg-[#1b1b1bf3] text-white rounded shadow">
      <div>
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          placeholder="enter name"
          className="border-b outline-none p-2 w-full"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <textarea
          {...register("description", { required: "Description is required" })}
          placeholder="enter product description"
          className="border-b outline-none p-2 w-full"
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>

      <div>
        <input
          {...register("price", { required: "Price is required", valueAsNumber: true })}
          type="number"
          placeholder="enter price"
          className="border-b outline-none p-2 w-full"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div>
        <select
          {...register("category", { required: "Category is required" })}
          className="border-b outline-none p-2 w-full bg-[#1b1b1bf3]"
        >
          <option value="">Select a category</option>
          <option value="Phone">Phone</option>
          <option value="Computers">Computers</option>
          <option value="Smartwatch">Smartwatch</option>
          <option value="Camera">Camera</option>
          <option value="Headphones">Headphones</option>
          <option value="Gaming">Gaming</option>
          <option value="Other">Other</option>
        </select>
        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
      </div>

      <div>
        <input
          {...register("brand", { required: "Brand is required" })}
          type="text"
          placeholder="enter brand"
          className="border-b outline-none p-2 w-full"
        />
        {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
      </div>

      <div>
        <input
          {...register("stock", { required: "Stock is required", valueAsNumber: true })}
          type="number"
          placeholder="enter stock available"
          className="border-b outline-none p-2 w-full"
        />
        {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
      </div>

      <div>
        <input
          {...register("images")}
          type="file"
          multiple
          placeholder="select images"
          className="border-b outline-none p-2 w-full"
        />
      </div>

      <button type="submit" className="bg-[#9afc49] text-white p-2 rounded">
        {loading ? 'creating..' : 'Submit'}
      </button>
    </form>
  );
};

export default ProductForm;
