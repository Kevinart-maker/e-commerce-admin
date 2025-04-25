import { useForm, SubmitHandler } from "react-hook-form";
import { FaFileImage, FaUser } from "react-icons/fa6";
import { useAuth } from "@/context/Auth";
import { useEffect } from "react";

export interface ProductFormInputs {
  name: string;
  image: FileList | null;
  createdAt?: string;
}

interface ProductFormProps {
  loading: boolean;
  initialValues?: ProductFormInputs;
  onSubmit: (data: FormData) => void;
}

const ProfileForm: React.FC<ProductFormProps> = ({ loading, initialValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    defaultValues: {
      name: initialValues?.name || "",
      image: null,
      createdAt: initialValues?.createdAt || "",
    },
  });

  const { toggleVisible } = useAuth();

  useEffect(() => {
    if (initialValues?.image) {
      setValue("image", null); // Reset image input initially
    }
  }, [initialValues, setValue]);

  const handleFormSubmit: SubmitHandler<ProductFormInputs> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex text-xs flex-col gap-4 p-4 bg-gray-50 text-zinc-950 rounded pt-[3rem]">
      <div className="bg-white border rounded border-gray-200 flex items-center px-2">
        <FaUser className="text-gray-300" />
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          placeholder="John Doe"
          className="outline-none p-2 w-full"
        />
      </div>
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <div className="bg-white border rounded border-gray-200 flex items-center px-2">
        <FaFileImage className="text-gray-300" />
        <input
          type="file"
          accept="image/*"
          className="outline-none p-2 w-full"
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              setValue("image", files);
            }
          }}
        />
      </div>
      {errors.image && <p className="text-red-500">{errors.image.message}</p>}

      <div className="w-fit self-baseline-last flex gap-4 mt-[2rem]">
        <div onClick={toggleVisible} className="cursor-pointer bg-gray-200 text-zinc-950 text-sm px-[1.5rem] py-[0.4rem] hover:text-zinc-950 w-fit self-center rounded hover:scale-110">
          Cancel
        </div>

        <button type="submit" className="bg-zinc-950 text-white text-sm px-[1.5rem] py-[0.4rem] w-fit self-center rounded hover:scale-110">
          {loading ? "Updating..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;