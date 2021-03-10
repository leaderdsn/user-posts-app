import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom';
import { useRootStore } from '../../stores/RootStateContext';
import {Table, Button, Form} from 'react-bootstrap';
import Spinner from '../spinner';
import { IComment } from '../../stores/CommentsStore';
import './list-comments.css';

interface RouteParams {
    id: string
}

interface ListCommentsProps {
    comments: IComment[]
    isLoading?: boolean
    page?: number
}

export const ListComments: React.FC<ListCommentsProps> = ({comments, isLoading, page}) => {
    const {id: idComments} = useParams<RouteParams>();
    const{commentsStore} = useRootStore();

    useEffect(()=>{
        commentsStore.loadComments(page, Number(idComments));
    },[idComments, page, commentsStore])

    return(
        <>
            <div className='wrapper'>
                <h3 className="user-id">Post id:{idComments}</h3>
                <div className='btn-container'>
                    <Link className='btn btn-outline-primary my-2 btn-sm' to={`/posts/${idComments}`}>Back</Link>
                </div>
                <Table className='list-posts' bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Choice</th>
                        <th>User name</th>
                        <th>Comment</th>
                        <th>Action</th>
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
                            comments.map(comment => {
                                const {id, post_id, name, body} = comment
                                    return (
                                        <tr key={id}>
                                            <td>{id}</td>
                                            <td className='choice-col'>
                                                <Form.Check type="checkbox" 
                                                />
                                            </td>
                                            <td>{name}</td>
                                            <td>{body}</td>
                                            <td className='action-col'>
                                                <Button className='btn btn-primary btn-sm'>Show</Button>
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