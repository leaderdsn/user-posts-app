import { useRootStore } from '../../store/RootStateContext';
import { Button } from 'react-bootstrap';
import './load-users-button.css';

export const LoadUsersButton:React.FC = () => {
    
    const { usersStore } = useRootStore();

    return (
        <>
            <div
                // variant='link'
                className='load-users-button'
                onClick={() => {
                    usersStore.loadUsers() 
                }}
            ></div>
            { console.log(usersStore.users)}
        </>
    )
}