import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    const fetchOtherUsers = async (req, res) => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(`http://localhost:8080/api/v1/user`);
            dispatch(setOtherUsers(response.data));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchOtherUsers();
    }, [])
}

export default useGetOtherUsers;