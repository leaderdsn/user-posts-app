import React from 'react';
import { Navbar} from 'react-bootstrap'
import { LoadUsersButton } from '../load-users-button';
import './menu.css'

export const Menu:React.FC = () => {
    return (
        <>
            <Navbar className="menu" bg="light" expand="lg">
                <LoadUsersButton/>
            </Navbar>
        </>
    )
}