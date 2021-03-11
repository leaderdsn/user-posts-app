import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import Spinner from '../spinner';
import './list-users.css';
import { Link } from 'react-router-dom';
import { IUser} from '../../stores/UsersStore';
import { observer } from 'mobx-react-lite';

interface ListUsersProps {
    users: IUser[]
    isLoading?: boolean
}

export const ListUsers: React.FC<ListUsersProps> = observer(({users, isLoading}) => {
    const[itemChecked, setItemChecked] = useState<number>()

    const onCheckedHandler = (e:React.ChangeEvent<HTMLInputElement>, id:number) => {
        if(e.target.checked){  
            // let node: NodeListOf<ChildNode> = e.target.offsetParent?.parentNode?.parentNode?.lastChild?.childNodes?.classList
        
        console.log(e)
            return setItemChecked(id)
        }  
        return setItemChecked(0)
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
                                const {id, name, gender, status} = user
                                return (
                                    <tr key={id} className="item">
                                        <td className='id-col'>{id}</td>
                                        <td className='choice-col'>
                                            <Form.Check type="checkbox" 
                                                onChange={(e)=> onCheckedHandler(e, id)} 
                                                onClick={this.onCheckedHandler(id)} 
                                            />
                                        </td>
                                        <td>{name}</td>
                                        <td>{gender}</td>
                                        <td>{status}</td>
                                        <td className="action-col">
                                            <Link id={`btn-${id}`} className={`btn btn-sm ${!itemChecked ? 'btn-secondary disabled-link': 'btn-primary' }`} to={`/posts/${id}/`} >Go to posts</Link>
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