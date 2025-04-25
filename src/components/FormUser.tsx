import { useForm, SubmitHandler } from "react-hook-form";
import { IoMail } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { HiMiniLockClosed } from "react-icons/hi2";
import { Link } from "react-router-dom";


export interface ProductFormInputs {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt?: string; // Optional field for created date
}

interface ProductFormProps {
  loading: boolean; // Loading state for the form
  initialValues?: ProductFormInputs; // Pre-filled values for update
  onSubmit: (data: ProductFormInputs) => void; // Callback for form submission
}

const FormUser: React.FC<ProductFormProps> = ({ loading, initialValues, onSubmit }) => {
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
        <FaUser className="text-gray-300"/>
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          placeholder="John Doe"
          className="outline-none p-2 w-full"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="bg-white border rounded border-gray-200 flex items-center px-2">
        <IoMail className="text-gray-300"/>
        <input
          {...register("email", { required: "Email is required" })}
          type="text"
          placeholder="johndoe@mail.com"
          className="outline-none p-2 w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      
      <div className="bg-white border rounded border-gray-200 flex items-center px-2">
        <HiMiniLockClosed className="text-gray-300"/>
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="enter password"
          className="outline-none p-2 w-full"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      <div className="border rounded border-gray-200 outline-none p-2 w-full bg-white flex items-center px-2 gap-2">
        <MdAdminPanelSettings className="text-gray-300"/>
        <select
          {...register("role", { required: "Role is required" })}
          className="outline-none w-full"
        >
          <option value="" className="flex items-center px-2">Select a role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Superadmin</option>
        </select>
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}
      </div>


      <div className="w-fit self-baseline-last flex gap-4 mt-[2rem]">
        <Link to='/users' className="bg-gray-200 text-zinc-950 text-sm px-[1.5rem] py-[0.4rem] hover:text-zinc-950 w-fit self-center rounded hover:scale-110">
          Cancel
        </Link>

        <button type="submit" className="bg-zinc-950 text-white text-sm px-[1.5rem] py-[0.4rem] w-fit self-center rounded hover:scale-110">
          {loading ? 'creating..' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default FormUser;