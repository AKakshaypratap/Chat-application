import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });
  const navigate = useNavigate();

  const selectGender = (gender) => {
    setUser({ ...user, gender });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/user/register`, user, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if(response.data.success){
        navigate("/login")
        toast.success(response.data.message)
      }
    } catch (error){
      toast.error(error.response.data.message)
      console.log(error);
    }
    setUser({
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: ""
    })
  }
  return (
    <div className='min-w-96 mx-auto'>
      <div className='p-6 h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center'>Signup</h1>
        <form onSubmit={handleSubmit} action="">
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>UserName</span>
            </label>
            <input
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
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
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input input-bordered h-10'
              type="password"
              placeholder="Enter a strong password"
            />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className='w-full input input-bordered h-10'
              type="password"
              placeholder="Re-enter password"
            />
          </div>
          <div className='flex items-center my-4 mx-auto'>
            <div className='flex items-center'>
              <p>Male</p>
              <input
                checked={user.gender === "male"}
                onChange={() => selectGender("male")}
                type="checkbox"
                defaultChecked
                className="checkbox mx-2"
              />
            </div>
            <div className='flex items-center ml-4'>
              <p>Female</p>
              <input
                checked={user.gender === "female"}
                onChange={() => selectGender("female")}
                type="checkbox"
                defaultChecked
                className="checkbox mx-2"
              />
            </div>
          </div>
          <div className='w-full mx-auto flex items-center text-center'>
            <p className='mr-4'>Already have an account?</p>
            <Link to='/login'>
              <button className="btn btn-dash">Login</button>
            </Link>
          </div>
          <div>
            <button type="submit" className='btn btn-block btn-sm mt-4 border border-slate-700'>SignUp</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;