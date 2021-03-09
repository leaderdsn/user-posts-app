import React from 'react';
import {PageItem, Pagination as Pag} from 'react-bootstrap';
import './pagination.css'

interface PaginationProps {
    total: number,
    perPage: number,
    paginate: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({perPage, total, paginate}) => {
    let active:number = 27;
    let pageNumbers: number[] = [];

    for (let i = 1; i <= Math.ceil(total / perPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <Pag>
            {
                pageNumbers.map(num => {
                    return (
                        <PageItem
                            key={num}
                            active={num === active}
                            onClick={() => paginate(num)}
                        >
                            {num}
                        </PageItem>
                    )
                })
            }
        </Pag>
    )
}