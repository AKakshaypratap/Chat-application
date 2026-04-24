import Sidebar from "./sideBar/Sidebar";
import MessageContainer from "./messageContainer/MessageContainer";

const HomePage = () => {
  return (
    <div className='flex rounded-lg overflow-hidden sm:h-[450px] md:h-[550px]'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default HomePage