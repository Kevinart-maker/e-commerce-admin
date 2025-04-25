import FormUser from "@/components/FormUser";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/Auth";

export interface ProductFormInputs {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt?: string; // Optional field for created date
}

export default function CreateUser() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const { signup } = useAuth(); // Use the signup function from AuthContext

  const handleCreate = async (data: ProductFormInputs) => {
    setLoading(true);
    setError(null);
    setMsg(null);

    try {
      // Use the signup function from AuthContext
      await signup(data.email, data.password, data.name, data.role);

      console.log("User created successfully");
      setMsg("User created!");
    } catch (err) {
      console.error("Error: ", err);
      setError("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-[3rem] md:mt-[3rem]">
      <h1 className="font-medium text-xl text-zinc-950">
        <Link to="/users" className="hover:underline text-2xl">
          Users
        </Link>{" "}
        / Create
      </h1>
      <FormUser loading={loading} onSubmit={handleCreate} />
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