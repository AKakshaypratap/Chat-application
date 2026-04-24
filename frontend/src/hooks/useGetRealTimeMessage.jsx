import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const { messages } = useSelector(store => store.message);
    const dispatch = useDispatch();

    console.log("socket", socket);

    useEffect(() => {
        if (socket) {
            console.log("Setting up newMessage listener");
            socket.on("newMessage", (newMessage) => {
                console.log("Received newMessage:", newMessage);
                dispatch(setMessages([...messages, newMessage]));
            });
            
            return () => {
                console.log("Cleaning up newMessage listener");
                socket.off("newMessage");
            };
        }
    }, [socket, messages, dispatch]);
};

export default useGetRealTimeMessage;