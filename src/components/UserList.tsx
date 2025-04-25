import { CiTrash } from 'react-icons/ci';
import { useAuth } from '../context/Auth'
import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface user {
  _id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}

const UserList = React.memo(({ user }: { user: user }) => {
    const { deleteUser, user: profile } = useAuth();

    const handleDelete = () => {
        deleteUser(user._id);
    }
    
  return (

        <tr className="md:static md:table-row relative bg-white p-2 flex flex-col gap-2">
          <td className="overflow-hidden px-4 p-[0.4rem] flex items-center gap-4 bg-white">
            {
              user.image ? <span className='overflow-hidden rounded-[100%] flex items-center justify-center'><img src={user.image} alt={user.name} className="w-[2rem] object-cover h-[2rem]"/></span> : <FaUserCircle className="text-[2rem]" />
            }
            <span>{user.name}</span>
          </td>
          <td className="p-[0.4rem] bg-white text-xs">{user.email}</td> 
          <td className="p-[0.4rem] bg-white text-xs">{user.role}</td>
          <td className="p-[0.4rem] bg-white">
          {
            profile?.role === "superadmin" ? (
              <div className="flex items-center gap-4 md:static absolute top-2 right-2">
              <div className="border border-gray-100 p-2 rounded hover:bg-gray-100">
                <CiTrash onClick={handleDelete} className="text-xl hover:scale-115 cursor-pointer"/>
              </div>
            </div>
            ) : ''
          }
          </td>
        </tr>

  )
})

export default UserList;