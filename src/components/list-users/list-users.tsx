import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useRootStore } from '../../store/RootStateContext';
import Spinner from '../spinner'
import './list-users.css';

export const ListUsers:React.FC = () => {

    const { usersStore } = useRootStore();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
    },[isLoading])

    return (
        <>
        <Table bordered hover size="sm">
            <thead> 
                <tr>
                    <th>#</th>
                    <th>User name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    isLoading ? usersStore.users.map((user, i) => {
                        return(
                            <tr key={i}>
                                <td>{user}</td>
                                <td>{user}</td>
                                <td>
                                    <Button>Go to posts</Button>
                                </td>
                            </tr>
                        )
                    }) : <Spinner />
                }
            </tbody>
        </Table> 
        <div className='pangination-container'>
            <Button variant='secondary' disabled={isLoading}>
                {!isLoading ? 'Loading…' : 'Load More'}
            </Button>
        </div>
        </>
    )
}