import React from 'react';
//@ts-ignore
// import Pagination from 'react-bootstrap-4-pagination';
import { Pagination, PaginationItem } from '@material-ui/lab';
import './pagination-props.css'
import { IPagination } from '../../interfaces/pagination';
import { setMaxListeners } from 'node:process';

interface PaginationProps extends IPagination {
    paginate: (page: number) => void
}

export const PaginationProps: React.FC<PaginationProps> = ({ pages = 0, page = 1, total = 0, limit = 20, paginate }) => {

    // let paginationConfig = {
    //     totalPages: total,
    //     currentPage: page,
    //     showMax: limit,
    //     size: "sm",
    //     threeDots: true,
    //     prevNext: true,
    //     onClick: function () {
    //         if(page === 1){
    //             paginate(page - 1);   
    //             console.log(page);
    //         } else if(page === pages){
    //             paginate(page + 1) 
    //             console.log(page); 
    //         }
    //     }
    // };
    const onChageItem = (page: number) => {
        if(page === 1){
            paginate(page - 1);   
            console.log(page);
        } else if(page === pages){
            paginate(page + 1) 
            console.log(page); 
        }
    }
    return (//@ts-ignore
        <>   
            {/* <Pagination {...paginationConfig} /> */}
            <Pagination 
                defaultPage={1}
                count={limit}
                page={page}
                boundaryCount={1}
                showFirstButton={true}
                showLastButton={true}
                siblingCount={1}
                size={'small'}
                onChange={//@ts-ignore
                    (page) => onChageItem(page)}
                renderItem={
                    (page)=> {
                        return (
                            <PaginationItem {...page} />
                        )
                    }
                }
                getItemAriaLabel={(page)=> page}
                color='primary'
            />
        </>
    )
}
