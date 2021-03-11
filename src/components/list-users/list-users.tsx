import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import Spinner from '../spinner';
import { Link } from 'react-router-dom';
import { IUser } from '../../stores/UsersStore';
import { observer } from 'mobx-react-lite';
import './list-users.css';

interface ListUsersProps {
    users: IUser[]
    isLoading?: boolean
}

export const ListUsers: React.FC<ListUsersProps> = observer(({ users, isLoading }) => {
    const [itemsChecked, setItemsChecked] = useState<number[]>([])

    const onCheckedHandler = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        if (e.target.checked) {
            setItemsChecked([...itemsChecked, id])
        } else {
            setItemsChecked([...itemsChecked.filter(item => item !== id)])
        }
    }

    return (
        <>
            <div className='wrapper'>
                <Table className='list-users' bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Choice</th>
                            <th>User name</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? (
                                <tr>
                                    <td className='loading-container' colSpan={6}>
                                        <Spinner />
                                    </td>
                                </tr>
                            ) : (
                                users.map(user => {
                                    const { id, name, gender, status } = user
                                    const isItemChecked = itemsChecked.includes(id)

                                    return (
                                        <tr key={id} className="item">
                                            <td className='id-col'>{id}</td>
                                            <td className='choice-col'>
                                                <Form.Check type="checkbox"
                                                    onChange={(e) => onCheckedHandler(e, id)}
                                                />
                                            </td>
                                            <td>{name}</td>
                                            <td>{gender}</td>
                                            <td>{status}</td>
                                            <td className="action-col">
                                                <Link className={`btn btn-sm ${isItemChecked ? 'btn-primary' : 'btn-secondary disabled-link'}`}
                                                    to={`/posts/${id}/`} >Go to posts</Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
})