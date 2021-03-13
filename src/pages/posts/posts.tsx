import React, { useEffect } from 'react';
import { ListPosts } from '../../components/list-posts';
import { useRootStore } from '../../stores/RootStateContext';
import { Pagination } from '../../components/pagination';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';

interface RouteParams {
    user_id: string
    name: string
}

export const Posts: React.FC = observer(() => {
    const { user_id,  name } = useParams<RouteParams>();
    const { postsStore } = useRootStore();
    const { posts, isLoading, pagination } = postsStore;
    const hasPosts = !!posts.length
    const showPagination = !isLoading && hasPosts
    const paginate = (pageNumber: number) => postsStore.loadPosts(pageNumber)

    useEffect(() => {
        postsStore.loadPosts(pagination?.page, Number(user_id));

        return () => {
            postsStore.reset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <ListPosts
                name={name}
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
