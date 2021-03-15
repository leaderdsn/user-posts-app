import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRootStore } from '../../stores/RootStateContext';
import Spinner from '../spinner';
import './post.css';

interface ListPostProps {
    postId: string;
    userId: string;
    isLoading?: boolean;
}

export const Post: React.FC<ListPostProps> = observer(({postId, userId, isLoading}) => {
    const { postStore, commentsStore } = useRootStore();
    const { title, body } = postStore.post || {};

    const onClickBtn = () => {
        commentsStore.loadComments(Number(postId));
    }

    useEffect(() => {
        postStore.loadPost(postId);

        return () => {
            postStore.reset();
            commentsStore.reset();
        };
    }, []);

    return (
        <>
            <div className='post-container'>
                <h4 className='post-header'>Post name: <span className='post-header-name'>{title}</span></h4>
                <Link className='btn-back-posts btn btn-outline-primary my-2 btn-sm' to={`/${userId}/posts/`}>Back</Link>
                <Table className='post-list' size='sm' hover responsive>
                    <thead>
                        <tr>
                            <th className='header-post-id text-center'>#</th>
                            <th className='header-post-title'>Post Title</th>
                            <th>Post Body</th>
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
                                <tr>
                                    <td className='align-middle text-center'>{postId}</td>
                                    <td>{title}</td>
                                    <td>{body}</td>
                                    <td className='align-middle text-center'>
                                        <Button className='btn-show-comments btn btn-sm'
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
            </div>
        </>
    );
});