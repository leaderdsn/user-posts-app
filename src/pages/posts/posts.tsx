import React, {useEffect} from 'react';
import {ListPosts} from '../../components/list-posts';
import {useRootStore} from '../../stores/RootStateContext';
import {Pagination} from '../../components/pagination';
import {observer} from 'mobx-react-lite';
import {useParams} from 'react-router';
import Spinner from '../../components/spinner';
import { Link } from 'react-router-dom';

interface RouteParams {
    userId: string
}

export const Posts: React.FC = observer(() => {
    const {userId} = useParams<RouteParams>();
    const {userStore, postsStore} = useRootStore();
    const {posts, isLoading, pagination} = postsStore;
    const hasPosts = !!posts.length
    const showPagination = !isLoading && hasPosts
    const paginate = (pageNumber: number) => postsStore.loadPosts(pageNumber)

    useEffect(() => {
        userStore.loadUser(userId)
        postsStore.loadPosts(pagination?.page, userId);

        return () => {
            postsStore.reset()
            userStore.reset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (userStore.isLoading) {
        return <Spinner />
    }

    return (
        hasPosts ? (
            <>
                <ListPosts
                    name={userStore.user?.name}
                    posts={posts}
                    isLoading={isLoading}
                />
                {showPagination && (
                    <Pagination
                        pages={pagination?.pages}
                        page={pagination?.page}
                        total={pagination?.total}
                        limit={pagination?.limit}
                        paginate={paginate}
                    />
                )}
            </>
        ) : (
            <>
                <Link className='btn btn-outline-primary my-2 btn-sm d-flex' to={`/`}>Back</Link>
                <h4 className='w-100 text-center'>No posts</h4>
            </>
        )     
    );
});
