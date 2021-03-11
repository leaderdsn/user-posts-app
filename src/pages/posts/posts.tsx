import React, { useEffect } from 'react';
import { ListPosts } from '../../components/list-posts';
import { useRootStore } from '../../stores/RootStateContext';
import { Pagination } from '../../components/pagination';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';

interface RouteParams {
    id: string
}

export const Posts: React.FC = observer(() => {
    const { id: userId } = useParams<RouteParams>();
    const { postsStore } = useRootStore();
    const { posts, isLoading, pagination } = postsStore;
    const hasPosts = !!posts.length
    const showPagination = !isLoading && hasPosts
    const paginate = (pageNumber: number) => postsStore.loadPosts(pageNumber)

    useEffect(() => {
        postsStore.loadPosts(pagination?.page, Number(userId));

        return () => {
            postsStore.reset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <ListPosts
                userId={userId}
                posts={posts}
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
