import React, {MouseEvent, ReactNode} from 'react';
import { TablePagination } from '@material-ui/core';
import './posts-pagination.css'
import {IPagination} from '../../stores/UsersStore';

interface PaginationProps extends IPagination {
    paginate: (page: number) => void
    // handleChangePage:(e:React.MouseEvent<HTMLButtonElement>) => void
}

export const PostsPagination: React.FC<PaginationProps> = ({ pages = 1, page = 1, total = 0, limit = 0, paginate}) => {
    const content: ReactNode[] = [];
    const pagesCount = Math.ceil(total/limit)

    const handleChangePage = (e:React.MouseEvent<>) => {
        paginate(Number(e));
    };
    
    // const handleChangeRowsPerPage = (event:React.MouseEvent<HTMLButtonElement>) => {
    //     // paginate(Number(parseInt(event.target.value, 5)));
    //     paginate(0);
    // };

    return (
        <TablePagination 
            count={limit} 
            component="div" 
            page={page}
            rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={limit}
            onChangePage={handleChangePage}
            // onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    )
}
