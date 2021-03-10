import React from 'react';
import { useRootStore } from '../../stores/RootStateContext';
import { Pagination } from '../../components/pagination';
import { ListComments } from '../../components/list-comments';
import { observer } from 'mobx-react-lite';

export const PostDetails: React.FC = observer(() => {
    const {commentsStore} = useRootStore();
    const {comments, isLoading, pagination} = commentsStore;
    const paginate = (pageNumber: number) => commentsStore.loadComments(pageNumber)
    return (
        <>
            <ListComments
                comments={comments}
                page={pagination?.page}
                isLoading={isLoading}
            />
            {
                !isLoading ? (
                    <Pagination
                        pages={pagination?.pages}
                        page={pagination?.page}
                        total={pagination?.total}
                        limit={pagination?.limit}
                        paginate={paginate}
                    />
                ) : null
            }
        </>
    )
})