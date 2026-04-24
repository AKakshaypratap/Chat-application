import User from './User';
import useGetOtherUsers from '../../hooks/useGetOtherUsers';
import { useSelector } from 'react-redux';

const OtherUsers = () => {
    // custom hook for getting other users
    useGetOtherUsers();

    const {otherUsers} = useSelector(store => store.user);
    if(!otherUsers){
        return;
    }
    return (
        <div className='overflow-auto flex-1'>
            {
                otherUsers?.map((user) => {
                    return (
                        <User key={user._id} user={user}/>
                    )
                })
            }
        </div>
    )
}

export default OtherUsers;