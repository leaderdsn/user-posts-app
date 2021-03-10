import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useRootStore } from '../../stores/RootStateContext';
import { Table } from 'react-bootstrap';
import Spinner from '../../components/spinner';
import './list-posts.css';
import { IPost } from '../../stores/PostStore';
interface RouteParams {
    id: string
}
interface ListPostsProps {
    posts: IPost[]
    isLoading?: boolean
}

export const ListPosts: React.FC<ListPostsProps> = ({posts, isLoading}) => {
    const {id} = useParams<RouteParams>();
    const{postsStore} = useRootStore();

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
                            <th>Post Body</th>
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
                            posts.map(post => {
                                const {user_id, title, body, created_at, updated_at} = post
                                if(Number(id) === user_id){
                                    return (
                                        <tr key={user_id} className='item'>
                                            <td>{user_id}</td>
                                            <td>{title}</td>
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
        </>
    )
}