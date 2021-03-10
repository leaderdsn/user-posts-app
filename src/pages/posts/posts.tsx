import React from 'react';
import { ListPosts } from '../../components/list-posts';
import { useRootStore } from '../../stores/RootStateContext';
import { Pagination } from '../../components/pagination';
import { observer } from 'mobx-react-lite';

export const Posts: React.FC = observer(() => {
    const {postsStore} = useRootStore();
    const {posts, isLoading, pagination} = postsStore;
    const paginate = (pageNumber: number) => postsStore.loadPosts(pageNumber)
    return (
        <>
            <ListPosts
                posts={posts}
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