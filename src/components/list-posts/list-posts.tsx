import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form } from 'react-bootstrap';
import Spinner from '../../components/spinner';
import { IPost } from '../../stores/PostsStore';
import './list-posts.css';

interface ListPostsProps {
    posts: IPost[]
    isLoading?: boolean
    name: string
}

export const ListPosts: React.FC<ListPostsProps> = ({name, posts, isLoading}) => {
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
                <h3 className="user-id">User name: {name}</h3>
                <div className='btn-container'>
                    <Link className='btn btn-outline-primary my-2 btn-sm' to={`/`}>Back</Link>
                </div>
                <Table className='list-posts' hover size="sm" responsive>
                    <thead className='list-posts-head'>
                        <tr>
                            <th className='id-col'>#</th>
                            <th className='choice-col'>Choice</th>
                            <th>Post Title</th>
                            <th className='action-col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? (
                                <tr>
                                    <td className='loading-container' colSpan={5}>
                                        <Spinner />
                                    </td>
                                </tr>

                            ) : (
                                posts.map(post => {
                                    const { id, user_id, title, body } = post
                                    const isItemChecked = itemsChecked.includes(id)
                                    return (
                                        <tr key={`post-${id}`} className={`item ${isItemChecked ? 'item-checked bg-success' : ''}`}>
                                            <td className='id-col align-middle'>{id}</td>
                                            <td className='choice-col align-middle'>
                                                <Form.Check type="checkbox"
                                                    onChange={(e) => onCheckedHandler(e, id)}
                                                />
                                            </td>
                                            <td>{title}</td>
                                            <td className='action-col align-middle'>
                                            <Link className={`btn btn-sm ${isItemChecked ? 'btn-primary' : 'btn-secondary disabled-link'}`} 
                                                    to={`/post-details/${user_id}/${name}/${id}/${title}/${body}`}>Show post</Link>
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
}
