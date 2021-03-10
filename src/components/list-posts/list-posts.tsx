import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useRootStore } from '../../stores/RootStateContext';
import { Table } from 'react-bootstrap';
import Spinner from '../../components/spinner';
import { IPost } from '../../stores/PostsStore';
import './list-posts.css';
interface RouteParams {
    id: string
}
interface ListPostsProps {
    posts: IPost[]
    isLoading?: boolean
    page?: number
}

export const ListPosts: React.FC<ListPostsProps> = ({posts, isLoading, page}) => {
    const {id: userId} = useParams<RouteParams>();
    const{postsStore} = useRootStore();

    useEffect(() => {
        let mounted = true;

        if(mounted){
            postsStore.loadPosts(page, Number(userId));
        }
        
        return() => {
            mounted = false;
        }
    },[userId, page, postsStore])

    return(
        <>  
        <div className='wrapper'>
            <h3 className="user-id">User id:{userId}</h3>
            <div className='btn-container'>
                <Link className='btn btn-outline-primary my-2 btn-sm' to={`/`}>Back</Link>
            </div>
            <Table className='list-posts' bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Post Title</th>
                            <th>Post Body</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        isLoading ? (
                            <tr>
                                <td className='loading-container' colSpan={4}>
                                    <Spinner />
                                </td>
                            </tr>
                            
                        ) : (
                            posts.map(post => {
                                const {id, user_id, title, body} = post
                                return (
                                    <tr key={user_id} className='item'>
                                        <td className='id-col'>{id}</td>
                                        <td>{title}</td>
                                        <td>{body}</td>
                                        <td className='action-col'>
                                            <Link className='btn btn-primary btn-sm' to={`/post-details/${user_id}/`}>Show</Link>
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