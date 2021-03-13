import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form } from 'react-bootstrap';
import Spinner from '../../components/spinner';
import { IPost } from '../../stores/PostStore';
import './list-posts.css';

interface ListPostsProps {
    posts: IPost[];
    isLoading?: boolean;
    name?: string;
}

export const ListPosts: React.FC<ListPostsProps> = ({ name, posts, isLoading }) => {
    const [itemsChecked, setItemsChecked] = useState<number[]>([]);

    const onCheckedHandler = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        if (e.target.checked) {
            setItemsChecked([...itemsChecked, id]);
        } else {
            setItemsChecked([...itemsChecked.filter(item => item !== id)]);
        };
    };

    return (
        <>
            <div className='posts-container'>
                <h4>User name: <span className='header-user-name'>{name}</span></h4>
                <Link className='btn btn-outline-primary my-2 btn-sm' to={`/`}>Back</Link>
                <Table className='posts-list' size='sm' hover responsive>
                    <thead>
                        <tr>
                            <th className='header-id'>#</th>
                            <th className='header-choice text-center'>Choice</th>
                            <th>Post Title</th>
                            <th className='header-action text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? (
                                <tr>
                                    <td className='text-center' colSpan={4}>
                                        <Spinner />
                                    </td>
                                </tr>

                            ) : (
                                posts.map(post => {
                                    const { id, user_id, title } = post;
                                    const isItemChecked = itemsChecked.includes(id);
                                    return (
                                        <tr key={id} className={`${isItemChecked ? 'bg-success' : ''}`}>
                                            <td className='align-middle text-center'>{id}</td>
                                            <td className='align-middle text-center'>
                                                <Form.Check type="checkbox"
                                                    onChange={(e) => onCheckedHandler(e, id)}
                                                />
                                            </td>
                                            <td>{title}</td>
                                            <td className='align-middle text-center'>
                                                <Link className={`btn btn-sm ${isItemChecked ? 'btn-primary' : 'btn-secondary disabled-link'}`}
                                                    to={`/${user_id}/posts/${id}`}>Show post</Link>
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
};
