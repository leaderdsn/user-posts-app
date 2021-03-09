import React from 'react';
import {Menu} from '../../components/menu';
import {ListUsers} from '../../components/list-users';
import {useRootStore} from '../../stores/RootStateContext';
import {Pagination} from '../../components/pagination';
import { observer } from 'mobx-react-lite'


export const Home: React.FC = observer(() => {
    const {usersStore: {users, isLoading, pagination, loadUsers}} = useRootStore();
    const paginate = (pageNumber: number) => loadUsers(pageNumber)

    // const {total, limit} = pagination
    return (
        <>
            <Menu />
            <ListUsers
                users={users}
                isLoading={isLoading}
            />
            {
                !isLoading ? (
                    <Pagination
                        perPage={pagination.limit}
                        total={pagination.total}
                        paginate={paginate}
                    />
                ) : ''
            }
            
        </>
    )
})