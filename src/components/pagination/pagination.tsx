import React, { ReactNode } from 'react';
import {PageItem, Pagination as Paginate, } from 'react-bootstrap';
import './pagination.css'
import {IPagination} from '../../stores/UsersStore';

interface PaginationProps extends IPagination {
    paginate: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ pages = 0, page = 1, total = 0, limit = 20, paginate}) => {
    const content: ReactNode[] = [];
    const pagesCount = Math.ceil(total/limit)

    if(pages > limit){
        if(page > Math.round(limit/4)){
            for (let i = page-(Math.round(limit/8)-1); i <= page+(Math.round(limit/8)); i++) {
                content.push((
                    <PageItem
                        key={i}
                        active={i === page}
                        onClick={() => paginate(i)}
                    >
                        {i}
                    </PageItem>
                ))
                if(i === pagesCount) break
            }
        } else {
            for (let i = 1; i <=  Math.round(limit/4); i++) {
                content.push((
                    <PageItem
                        key={i}
                        active={i === page}
                        onClick={() => paginate(i)}
                    >
                        {i}
                    </PageItem>
                ))
                if(i === pagesCount) break
            }
        }
    } else {
        for (let i = 1; i <= pagesCount; i++) {
            content.push((
                <PageItem
                    key={i}
                    active={i === page}
                    onClick={() => paginate(i)}
                >
                    {i}
                </PageItem>
            ))
        }
    }

    return (
        <Paginate className='pagination' size='sm'>
            <PageItem
                onClick={()=> paginate(1)}
                disabled={ page !== 1 ? false : true }   
            >
                ❮❮
            </PageItem>
            <PageItem
                onClick={()=> page === 1 ? null : paginate(page - 1)}
                disabled={ page !== 1 ? false : true }   
            >
                ❮
            </PageItem>
            {
                content
            }
            <PageItem
                onClick={()=> page === pages ? null : paginate(page + 1)}
                disabled={ page === pages || pages === 0 ? true : false }
            >
                ❯
            </PageItem>
            <PageItem
                className='page-last'
                onClick={()=> paginate(pages)}
                disabled={ page === pages || pages === 0 ? true : false }   
            >
                ❯❯
            </PageItem>
        </Paginate>
    )
}
