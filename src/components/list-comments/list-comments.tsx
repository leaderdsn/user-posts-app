import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import { useRootStore } from '../../stores/RootStateContext';
import {Button, Table} from 'react-bootstrap';
import Spinner from '../spinner'
import './list-comments.css';

interface RouteParams {
    id: string
}

export const ListComments: React.FC = observer(() => {
    const {id} = useParams<RouteParams>();
    const{commentsStore} = useRootStore();
    const isLoading = commentsStore.isLoading;

    useEffect(()=>{
        commentsStore.loadComments();
    },[commentsStore])

    return(
        <>
            <h3 className="user-id">Post id:{id}</h3>
            <div className='btn-container'>
                <Link className='btn btn-outline-primary my-2' to={`/posts/${id}/`}>Back</Link>
            </div>
            <Table className='list-posts' bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>User name</th>
                        <th>Comment</th>
                        <th>Date Created</th>
                        <th>Date Updated</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        isLoading ? (
                            <td className='loading-container' colSpan={6}>
                                <Spinner />
                            </td>
                        ) : (
                            commentsStore.comments.map(comment => {
                                const {post_id, name, body, created_at, updated_at} = comment
                                if(Number(id) === post_id){
                                    return (
                                        <tr key={post_id}>
                                            <td>{post_id}</td>
                                            <td>{name}</td>
                                            <td>{body}</td>
                                            <td>{created_at}</td>
                                            <td>{updated_at}</td>
                                            <td>
                                                <Link className='btn btn-primary btn-sm' to={`/post-details/${id}/`}>Show</Link>
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        )
                    }
                    </tbody>
                </Table>
                <div className='pangination-container'>
                    <Button className='mx-2 ' variant={isLoading ? 'secondary': 'success'} disabled={isLoading}>
                        {isLoading ? 'Loading…' : 'Load More'}
                    </Button>
                    
                </div>
            
        </>
    )
})