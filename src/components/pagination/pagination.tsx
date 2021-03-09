import React, {ReactNode} from 'react';
import {PageItem, Pagination as Pag, } from 'react-bootstrap';
import './pagination.css'
import {IPagination} from '../../stores/UsersStore';

interface PaginationProps extends IPagination {
    paginate: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ pages = 0, page = 0, total = 0, limit = 0, paginate}) => {
    const content: ReactNode[] = [];
    const pagesCount = Math.ceil(total/limit)

    if(pages > 10){
        if(page > 5){
            for (let i = page-4; i <= page+5; i++) {
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
            for (let i = 1; i <= 10; i++) {
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
    // for (let i = 1; i < pages; i++) {
    //     content.push((
    //         <PageItem
    //             key={i}
    //             active={i === page}
    //             onClick={() => paginate(i)}
    //         >
    //             {i}
    //         </PageItem>
    //     ))
    // }

    return (
        <Pag>
            <PageItem
                onClick={()=> paginate(1)}
                disabled={ page !== 1 ? false : true }   
            >
                First
            </PageItem>
            <PageItem
                onClick={()=> page === 1 ? null : paginate(page - 1)}
                disabled={ page !== 1 ? false : true }   
            >
                Prev
            </PageItem>
            {
                content
            }
            <PageItem
                onClick={()=> page === pages ? null : paginate(page + 1)}
                disabled={ page !== pages ? false : true }
            >
                Next
            </PageItem>
            <PageItem
                onClick={()=> paginate(pages)}
                disabled={ page !== pages ? false : true }   
            >
                Last
            </PageItem>
        </Pag>
    )
}
