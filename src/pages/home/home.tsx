import React from 'react';
import { Menu } from '../../components/menu';
import { ListUsers } from '../../components/list-users';
import { useRootStore } from '../../stores/RootStateContext';
import { Pagination } from '../../components/pagination';
import { observer } from 'mobx-react-lite';

export const Home: React.FC = observer(() => {
    const { usersStore } = useRootStore();
    const { users, isLoading, pagination } = usersStore;
    const hasUsers = !!users.length
    const showPagination = !isLoading && hasUsers
    const paginate = (pageNumber: number) => usersStore.loadUsers(pageNumber);

    return (
        <>
            <Menu />
            <ListUsers
                users={users}
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
    );
});
