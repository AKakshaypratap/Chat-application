import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useDispatch} from "react-redux";
import { setAuthUser } from '../redux/userSlice';

const Login = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
     try {
      const response = await axios.post(`http://localhost:8080/api/v1/user/login`, user, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      console.log("response", response);
     
      if(response.data.user){
        // Store user data in localStorage for persistence across page refreshes
        // localStorage.setItem('user', JSON.stringify(response.data));
        navigate("/")
        toast.success(`Welcome Back - ${response.data.user.userName}`)
      }
      dispatch(setAuthUser(response.data));
    } catch (error){
      toast.error(error.response.data.message)
      console.log(error);
    }
    setUser({
      userName: "",
      password: "",
    })
  }
  return (
    <div className='min-w-96 mx-auto'>
      <div className='p-6 h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center'>Login</h1>
        <form onSubmit={handleSubmit} action="">
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>UserName</span>
            </label>
            <input
              value={user.userName}
              onChange={(e) => setUser({...user, userName: e.target.value})}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder="Enter your userName"
            />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
              className='w-full input input-bordered h-10'
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className='mt-6 w-full mx-auto flex items-center text-center'>
            <p className='mr-4'>Don't have an account?</p>
            <Link to='/register'>
              <button className="btn btn-dash">SignUp</button>
            </Link>
          </div>
          <div>
            <button
              type='submit'
              className='btn btn-block btn-sm mt-4 border border-slate-700'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;