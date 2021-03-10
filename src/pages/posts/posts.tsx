import React from 'react';
import { ListPosts } from '../../components/list-posts';
import {useRootStore} from '../../stores/RootStateContext';
import {PostsPagination} from '../../components/posts-pagination';
import { observer } from 'mobx-react-lite';

export const Posts: React.FC = observer(() => {
    const {postsStore} = useRootStore();
    const {posts, isLoading, pagination} = postsStore;
    const paginate = (pageNumber: number) => postsStore.loadPosts(pageNumber)
    return (
        <>
            <ListPosts
                posts={posts}
                isLoading={isLoading}
            />
            {
                !isLoading ? (
                    <PostsPagination
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