import React, { useEffect } from 'react';
import { useRootStore } from '../../stores/RootStateContext';
import { Pagination } from '../../components/pagination';
import { ListComments } from '../../components/list-comments';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Spinner from '../../components/spinner';

interface IRouteParams {
    id: string
    userName: string
    user_id: string
    title: string
    body: string
}


export const PostDetails: React.FC = observer(() => {
    const { id: post_id, userName, user_id, title, body } = useParams<IRouteParams>();
    const { commentsStore, postsStore } = useRootStore();
    const { comments, isLoading: isLoadingComments } = commentsStore;
    const { isLoading: isLoadingPost } = postsStore;
    const onClickBtn = () => {
        commentsStore.loadComments(Number(post_id))
    }

    // useEffect(() => {
    //     commentsStore.loadComments(pagination?.page, Number(postId));

    //     return () => {
    //         commentsStore.reset()
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    return (
        <>
            <div className='wrapper'>
                <h3 className="user-id">Post name: {title}</h3>
                <div className='btn-container'>
                    <Link className='btn btn-outline-primary my-2 btn-sm' to={`/posts/${user_id}/${userName}`}>Back</Link>
                </div>
                <Table className='list-posts border-secondary rounded' bordered hover size="sm">
                    <thead className='list-posts-head'>
                        <tr>
                            <th>#</th>
                            <th>Post Title</th>
                            <th>Post Body</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoadingPost ? (
                                <tr>
                                    <td className='loading-container' colSpan={5}>
                                        <Spinner />
                                    </td>
                                </tr>
                            ) : (
                                <tr key={user_id} className='item'>
                                    <td className='id-col'>{post_id}</td>
                                    <td>{title}</td>
                                    <td>{body}</td>
                                    <td className='action-col'>
                                        <Button className='btn btn-sm'
                                            onClick={onClickBtn}
                                        >
                                            Show comments
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                <ListComments
                    postId={post_id}
                    comments={comments}
                    isLoading={isLoadingComments}
                />
            </div>
        </>
    )
})