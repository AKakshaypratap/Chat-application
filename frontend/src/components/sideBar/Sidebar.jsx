import { FaSearch } from "react-icons/fa";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers } from "../../redux/userSlice";

const Sidebar = () => {
    const [search, setSearch] = useState("");
    const {otherUsers} = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/user/logout");
            // Clear user data from localStorage
            // localStorage.removeItem('user');
            navigate("/login");
            toast.success(response.data.message);
            dispatch(setAuthUser(null));
        } catch (error) {
            console.log(error);
            toast.error(response.data.message);
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        const searchedUser = otherUsers?.find((user) => user.userName.toLowerCase().includes(search.toLowerCase()));
        if(searchedUser){
            dispatch(setOtherUsers([searchedUser]));
        } else {
            toast.error("User not found");
        }
        setSearch("");
    }

    return (
        <div className='border-r p-4 flex flex-col bg-[url(/black-theme.jpg)] bg-contain bg-center text-white'>
            <form onSubmit={handleSearch} action="" className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='input input-bordered rounded-md text-black' type='text'
                    placeholder='Search...'
                />
                <button type='submit' className='btn bg-gray-100'>
                    <FaSearch />
                </button>
            </form>
            <div className='divider px-3'></div>
            <OtherUsers />
            <div onClick={handleLogout} className='mt-2'>
                <button className='btn btn-sm'>Logout</button>
            </div>
        </div>
    )
}

export default Sidebar