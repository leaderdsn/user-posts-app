import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import Spinner from '../spinner';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { IUser } from '../../stores/UserStore';
import './list-users.css';

interface ListUsersProps {
    users: IUser[];
    isLoading?: boolean;
}

export const ListUsers: React.FC<ListUsersProps> = observer(({ users, isLoading }) => {
    const [itemsChecked, setItemsChecked] = useState<number[]>([]);

    const onCheckedHandler = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        if (e.target.checked) {
            setItemsChecked([...itemsChecked, id]);
        } else {
            setItemsChecked([...itemsChecked.filter(item => item !== id)]);
        }
    };

    return (
        <>
            <div className='users-container'>
                <Table size='sm' hover responsive>
                    <thead>
                        <tr>
                            <th className='header-users-id text-center'>#</th>
                            <th className='header-users-choice'>Choice</th>
                            <th className='header-users-name'>User name</th>
                            <th className='header-users-gender'>Gender</th>
                            <th className='header-users-status'>Status</th>
                            <th className='header-users-action text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? (
                                <tr>
                                    <td className='text-center' colSpan={6}>
                                        <Spinner />
                                    </td>
                                </tr>
                            ) : (
                                users.map(user => {
                                    const { id, name, gender, status } = user
                                    const isItemChecked = itemsChecked.includes(id)

                                    return (
                                        <tr key={id} className={`${isItemChecked ? 'bg-success' : ''}`}>
                                            <td className='align-middle text-center'>{id}</td>
                                            <td className='align-middle text-center'>
                                                <Form.Check className='choice-user-item' type='checkbox'
                                                    onChange={(e) => onCheckedHandler(e, id)}
                                                />
                                            </td>
                                            <td className='align-middle text-nowrap text-truncate'>{name}</td>
                                            <td className='align-middle'>{gender}</td>
                                            <td className='align-middle'>{status}</td>
                                            <td className='align-middle text-center'>
                                                <Link className={`btn-show-posts text-nowrap text-truncate btn btn-sm ${isItemChecked ? 'btn-primary' : 'btn-secondary disabled-link'}`}
                                                    to={`/${id}/posts/`} >Go to posts</Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </>
    );
});
