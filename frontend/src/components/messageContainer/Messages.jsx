import React from 'react'
import SingleMsg from './SingleMsg';
import useGetMessages from '../../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../../hooks/useGetRealTimeMessage';

const Messages = () => {
  // hook for getting messages
  useGetMessages();
  useGetRealTimeMessage();
  
  const { messages } = useSelector(store => store.message);
  if(!messages) return;
  return (
    <div className='px-4 flex-1 overflow-auto'>
        {
          messages && messages?.map((message) => {
            return (
              <SingleMsg key={message._id} message={message}/>
            )
          })
        }
    </div>
  )
}

export default Messages