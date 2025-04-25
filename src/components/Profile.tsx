import { useAuth } from "@/context/Auth";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import ProfileForm from "./ProfileForm";
import { HiOutlinePencil } from "react-icons/hi2";

export default function Profile() {
  const { user, visible, toggleVisible, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (form: FormData) => {
    setLoading(true);
    try {
      await updateUserProfile(form);
      setMsg("Profile updated successfully!");
      toggleVisible();
    } catch (error) {
      setErr("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${visible ? "fixed w-full h-full" : "w-0 h-0 overflow-hidden"} inset-0 blurry flex justify-center items-center`}>
      <div className="bg-white p-4 rounded shadow-md md:w-[50vw] relative flex flex-col gap-4">
        {msg && <p className="text-green-500">{msg}</p>}
        {err && <p className="text-red-500">{err}</p>}
        <h1 className="flex gap-4 items-center">
          <span className="w-8 h-8 rounded-[100%] overflow-hidden flex items-center justify-center" ><img src={user?.image} alt="user" className="max-w-[150%]"/></span>
          <span className="text-xs">{user?.name}</span>
        </h1>
        <h2 className="md:text-xl font-bold mb-4 flex items-center justify-between">
          <span>Update Profile</span>
          <HiOutlinePencil className="text-xs"/>
        </h2>
        {user && (
          <ProfileForm
            loading={loading}
            initialValues={{
              name: user.name || "",
              image: null,
            }}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}