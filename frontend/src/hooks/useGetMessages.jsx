import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);

    const fetchMessages = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(`http://localhost:8080/api/v1/message/${selectedUser?._id}`);
            console.log("message response ", response);
            dispatch(setMessages(response.data));
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchMessages();
    }, [selectedUser])
}

export default useGetMessages;