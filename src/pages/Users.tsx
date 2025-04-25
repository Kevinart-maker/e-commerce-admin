import { useEffect, useState } from 'react';
import { useAuth } from '../context/Auth';
import Search from '../components/Search';
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom';
import UserList from '@/components/UserList';

export default function Users() {
    const { searchUsers, getAllUsers, fetchedUsers, searchedUsers } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(()=>{
        const fetchUsers = async () => {
            try {
            setLoading(true);
            await getAllUsers();
            setLoading(false);
            } catch (err: any) {
            setLoading(false);
            setError(err.message);
            }
        };
        fetchUsers();
    }, [])
  
    const resultsToDisplay = searchedUsers.length > 0 ? searchedUsers : fetchedUsers;


  return (
    <div className='p-[1rem] flex flex-col gap-8 md:mt-[3rem] mb-[5rem]'>
      <h1 className='text-2xl font-medium'>Users</h1>
        <div className='flex items-center gap-4'>
          <Search onSearch={searchUsers} placeholder="Search for Users..."/>
          <button className='hover:scale-115 hover:rotate-180 hover:bg-[#9afc49] hover:text-zinc-950 flex gap-2 items-center justify-center bg-zinc-950 text-white p-2 rounded'><Link to='/createuser'><IoMdAdd /></Link></button>
        </div>

        <div className='bg-gray-50 rounded text-sm p-2 md:hidden flex flex-col gap-4'>
        {resultsToDisplay.map((user) => (
          <UserList user={user} key={user._id} />
        ))}
        </div>

      <div className='bg-gray-50 rounded text-sm p-2 md:block hidden'>
        <table className="md:table min-w-full">
          <thead className="bg-gray-50 rounded-md">
            <tr>
              {/* <th className="font-normal px-4 py-2 text-left">Image</th> */}
              <th className="font-normal py-2 text-left">Name</th>
              <th className="font-normal py-2 text-left">Email</th>
              <th className="font-normal py-2 text-left">Role</th>
              <th className="font-normal py-2 text-left"><span className='sr-only'>Edit</span></th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200 text-xs'>
            {loading ? (
              <tr>
          <td colSpan={6} className="text-center text-xl font-medium py-4">
            Loading...
          </td>
              </tr>
            ) : (
              resultsToDisplay.map((user) => (
          <UserList user={user} key={user._id} />
              ))
            )}
          </tbody>
        </table>
      </div>
        
        { error && (<span className='px-[1rem] py-[0.3rem] text-xs text-red-500 bg-red-100 border border-red-500 w-fit rounded'>{error}</span>) }

      
    </div>
  )
}