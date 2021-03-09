import React from 'react';
import {Button, Table} from 'react-bootstrap';
import Spinner from '../spinner'
import './list-users.css';
import {Link} from 'react-router-dom';
import {IUser} from '../../stores/UsersStore';

interface ListUsersProps {
    users: IUser[]
    isLoading?: boolean
}

export const ListUsers: React.FC<ListUsersProps> = ({users, isLoading}) => {

    return (
        <>
            <Table className='list-users' bordered hover size='sm'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>User name</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    isLoading ? (
                        <td className='loading-container' colSpan={5}>
                            <Spinner />
                        </td>
                    ) : (
                        users.map(user => {
                            const {id, name, gender, status} = user

                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{gender}</td>
                                    <td>{status}</td>
                                    <td>
                                        <Link className='btn btn-primary btn-sm' to={`/posts/${id}/`}>Go to posts</Link>
                                    </td>
                                </tr>
                            )
                        })
                    )
                }
                </tbody>
            </Table>
            <div className='pangination-container'>
                {/* <Button variant={isLoading ? 'secondary' : 'success'} disabled={isLoading}>
                    {isLoading ? 'Loading…' : 'Load More'}
                </Button> */}
            </div>
        </>
    )
}