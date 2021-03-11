import React, { useEffect } from 'react';
import { useRootStore } from '../../stores/RootStateContext';
import { Pagination } from '../../components/pagination';
import { ListComments } from '../../components/list-comments';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';

interface RouteParams {
    id: string
}

export const PostDetails: React.FC = observer(() => {
    const { id: postId } = useParams<RouteParams>();
    const {commentsStore} = useRootStore();
    const {comments, isLoading, pagination} = commentsStore;
    const hasComments = !!comments.length
    const showPagination = !isLoading && hasComments
    const paginate = (pageNumber: number) => commentsStore.loadComments(pageNumber)
    
    useEffect(() => {
        commentsStore.loadComments(pagination?.page, Number(postId));

        return () => {
            commentsStore.reset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <>
            <ListComments
                postId={postId}
                comments={comments}
                isLoading={isLoading}
            />
            {
                showPagination && (
                    <Pagination
                        pages={pagination?.pages}
                        page={pagination?.page}
                        total={pagination?.total}
                        limit={pagination?.limit}
                        paginate={paginate}
                    />
                )
            }
        </>
    )
})