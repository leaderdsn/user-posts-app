import React from 'react';
import {observer} from 'mobx-react-lite';
import {useRootStore} from '../../stores/RootStateContext';
import './load-users-button.css';

export const LoadUsersButton: React.FC = observer(() => {
    const {usersStore} = useRootStore();
    const onClickBtn = () => {
        usersStore.loadUsers()
    }

    return (
        <div
            className='load-users-button'
            onClick={onClickBtn}
        />
    )
})