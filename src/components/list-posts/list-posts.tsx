import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useRootStore } from '../../stores/RootStateContext';
import { Button, Table } from 'react-bootstrap';
import Spinner from '../../components/spinner'
import './list-posts.css';
interface RouteParams {
    id: string
}

export const ListPosts: React.FC = observer(() => {
    const {id} = useParams<RouteParams>();
    const{postsStore} = useRootStore();
    const isLoading = postsStore.isLoading;

    useEffect(() => {
        postsStore.loadPosts();

    },[postsStore])

    return(
        <>
            <h3 className="user-id">User id:{id}</h3>
            <div className='btn-container'>
                <Link className='btn btn-outline-primary my-2' to={`/`}>Back</Link>
            </div>
            <Table className='list-posts' bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Post Title</th>
                        <th>Date Created</th>
                        <th>Date Updated</th>
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
                            postsStore.posts.map(post => {
                                const {user_id, title, created_at, updated_at} = post
                                if(Number(id) === user_id){
                                    return (
                                        <tr key={user_id}>
                                            <td>{user_id}</td>
                                            <td>{title}</td>
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
                    <Button className='mx-2' variant={isLoading ? 'secondary': 'success'} disabled={isLoading}>
                        {isLoading ? 'Loading…' : 'Load More'}
                    </Button>
                </div>
        </>
    )
})