import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Spinner from '../spinner';
import { IComment } from '../../stores/CommentsStore';
import './list-comments.css';

interface ListCommentsProps {
    comments: IComment[]
    isLoading?: boolean
    postId: string
}

export const ListComments: React.FC<ListCommentsProps> = ({ postId, comments, isLoading }) => {

    return (
        <>
            <div className='wrapper'>
                <h3 className="user-id">Post id:{postId}</h3>
                <div className='btn-container'>
                    <Link className='btn btn-outline-primary my-2 btn-sm' to={`/posts/${postId}`}>Back</Link>
                </div>
                <Table className='list-posts' bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User name</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? (
                                <tr>
                                    <td className='loading-container' colSpan={3}>
                                        <Spinner />
                                    </td>
                                </tr>
                            ) : (
                                comments.map(comment => {
                                    const { id, name, body } = comment
                                    return (
                                        <tr key={id}>
                                            <td>{id}</td>
                                            <td>{name}</td>
                                            <td>{body}</td>
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
