import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOnlineUsers } from './redux/userSlice';
import HomePage from './components/HomePage'
import Signup from './components/Signup';
import Login from './components/Login';
import { io } from 'socket.io-client';
import { setSocket } from './redux/socketSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/register",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  }
])

function App() {
  const { authUser } = useSelector(store => store.user);
  const { socket } = useSelector(store => store.socket);
  const dispatch = useDispatch();

  console.log("auth user", authUser);

  useEffect(() => {
    if (authUser) {
      const socket = io('http://localhost:8080', {
            query: {
              userId: authUser._id
            }
      });
      dispatch(setSocket(socket));
      socket.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      });
      console.log("socket", socket);
      return ()=> socket.close();
      
    } else if (socket){
      socket.close();
      dispatch(setSocket(null));
    }
  },[authUser]);

  return (
    <>
      <div className='p-4 h-screen flex items-center justify-center'>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
