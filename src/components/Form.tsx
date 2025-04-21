import { useForm, SubmitHandler } from "react-hook-form";
import { IoMdPricetag } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { MdBrandingWatermark } from "react-icons/md";
import { RiNumbersFill } from "react-icons/ri";
import { FaFileImage } from "react-icons/fa6";

export interface Review {
  user: string;
  comment: string;
  rating: number;
}

export interface ProductFormInputs {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  images?: FileList; // For file uploads
  reviews: Review[]; // Assuming reviews are part of the form, adjust as needed
  createdAt?: string; // Optional field for created date
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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex text-xs flex-col gap-4 p-4 bg-gray-50 text-zinc-950 rounded pt-[3rem]">
      <div className="bg-white border rounded border-gray-200 flex items-center px-2">
        <AiFillProduct className="text-gray-300"/>
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          placeholder="enter name"
          className="outline-none p-2 w-full"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="bg-white border rounded border-gray-200 flex items-center gap-2 px-2">
        <MdDescription className="text-gray-300"/>
        <textarea
          {...register("description", { required: "Description is required" })}
          placeholder="enter product description"
          className="outline-none p-2 w-full"
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>

      <div className="bg-white border rounded border-gray-200 flex items-center px-2">
        <IoMdPricetag className="text-gray-300"/>
        <input
          {...register("price", { required: "Price is required", valueAsNumber: true })}
          type="number"
          placeholder="enter price"
          className="outline-none p-2 w-full"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div className="border rounded border-gray-200 outline-none p-2 w-full bg-white flex items-center px-2 gap-2">
        <MdCategory className="text-gray-300"/>
        <select
          {...register("category", { required: "Category is required" })}
          className="outline-none w-full"
        >
          <option value="" className="flex items-center px-2">Select a category</option>
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

      <div className="bg-white border rounded border-gray-200 flex items-center px-2">
        <MdBrandingWatermark className="text-gray-300"/>
        <input
          {...register("brand", { required: "Brand is required" })}
          type="text"
          placeholder="enter brand"
          className="outline-none p-2 w-full"
        />
        {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
      </div>

      <div className="bg-white border rounded border-gray-200 flex items-center px-2">
        <RiNumbersFill className="text-gray-300"/>
        <input
          {...register("stock", { required: "Stock is required", valueAsNumber: true })}
          type="number"
          placeholder="enter stock available"
          className="outline-none p-2 w-full"
        />
        {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
      </div>

      <div className="bg-white border rounded border-gray-200 flex items-center px-2">
        <FaFileImage className="text-gray-300"/>
        <input
          {...register("images")}
          type="file"
          multiple
          placeholder="select images"
          className="outline-none p-2 w-full"
        />
      </div>


      <div className="w-fit self-baseline-last flex gap-4 mt-[2rem]">
        <button type="submit" className="bg-gray-200 text-zinc-950 text-sm px-[1.5rem] py-[0.4rem] hover:text-zinc-950 w-fit self-center rounded hover:scale-110">
          Cancel
        </button>

        <button type="submit" className="bg-zinc-950 text-white text-sm px-[1.5rem] py-[0.4rem] w-fit self-center rounded hover:scale-110">
          {loading ? 'creating..' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
