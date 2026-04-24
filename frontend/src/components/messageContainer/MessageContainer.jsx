import SendInput from './SendInput'
import Messages from './Messages'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { setSelectedUser } from '../../redux/userSlice';

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const isOnline = onlineUsers?.includes(selectedUser?._id);
    
    return (
        <>
            {selectedUser !== null ?
                (
                    <div className='md:min-w-[550px] flex flex-col bg-[url(/whatsapp.jpg)] bg-contain bg-center'>
                        <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2 cursor-pointer'>
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-10 rounded-full'>
                                    <img src={selectedUser?.profilePhoto} alt="user Image" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p>{selectedUser?.fullName}</p>
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
                        <h1 className='text-white text-xl font-bold'>Hi,{authUser?.user?.fullName}</h1>
                        <br />
                        <h1 className="text-white text-2xl">Select your freind to start Conversation</h1>
                    </div>

                )}
        </>
    )
}

export default MessageContainer