import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';

const SingleMsg = ({message}) => {
    const scroll = useRef();
    const {authUser, selectedUser} = useSelector(store => store.user);

    // Fallback to localStorage if authUser is null (happens on refresh)
    const getCurrentUserId = () => {
        if (authUser?.user?._id) {
            return authUser.user._id;
        }
        // Try to get from localStorage as fallback
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                return parsedUser.user?._id;
            } catch (error) {
                console.log('Error parsing stored user:', error);
            }
        }
        return null;
    };

    const getStoredUserProfilePhoto = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                return parsedUser.user?.profilePhoto;
            } catch (error) {
                console.log('Error parsing stored user profile photo:', error);
            }
        }
        return null;
    };

    const currentUserId = getCurrentUserId();
    const isOwnMessage = currentUserId === message?.senderId;

    useEffect(() => {
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[message]);
    
    return (
        <div ref={scroll} className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={isOwnMessage ? (authUser?.user?.profilePhoto || getStoredUserProfilePhoto()) : selectedUser?.profilePhoto}
                    />
                </div>
            </div>
            <div className='chat-header'>
                <time className='text-xs'>12:38</time>
            </div>
            <div className={`chat-bubble ${isOwnMessage ? 'bg-[#DCF8C6]' : 'bg-gray-700 text-white'}`}>{message?.message}</div>
        </div>
    )
}

export default SingleMsg;