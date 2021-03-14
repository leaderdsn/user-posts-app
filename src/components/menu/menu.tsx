import React from 'react';
import { LoadUsersButton } from '../load-users-button';

export const Menu: React.FC = () => {
    return (
        <>
            <div className='menu'>
                <LoadUsersButton />
            </div>
        </>
    );
};