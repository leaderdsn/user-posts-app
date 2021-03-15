import React from 'react';
import { useRootStore } from '../../stores/RootStateContext';
import { ListComments } from '../../components/list-comments';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';
import { Post } from '../../components/post';

interface IRouteParams {
    userId: string;
    postId: string;
}

export const PostDetails: React.FC = observer(() => {
    const { postId, userId } = useParams<IRouteParams>();
    const { postsStore, commentsStore } = useRootStore();
    const { comments, isLoading: isLoadingComments } = commentsStore;
    const { isLoading: isLoadingPost } = postsStore;

    return (
        <>
            <Post
                postId={postId}
                userId={userId}
                isLoading={isLoadingPost}
            />
            <ListComments
                comments={comments}
                isLoading={isLoadingComments}
            />
        </>
    );
});
