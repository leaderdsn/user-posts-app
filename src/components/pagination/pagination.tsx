import React from 'react';
import { PageItem, Pagination as Paginate } from 'react-bootstrap';
import { IPagination } from '../../interfaces/pagination';
import './pagination.css';

interface PaginationProps extends IPagination {
    paginate: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ pages = 0, page = 1, total = 0, limit = 20, paginate }) => {

    return (
        <Paginate size='sm'>
            <PageItem
                onClick={() => paginate(1)}
                disabled={page === 1}
            >
                ❮❮
            </PageItem>
            <PageItem
                onClick={() => page === 1 ? null : paginate(page - 1)}
                disabled={page === 1}
            >
                ❮
            </PageItem>
            <PageItem disabled>
                {`Page ${page} of ${pages}`}
            </PageItem>
            <PageItem
                onClick={() => page === pages ? null : paginate(page + 1)}
                disabled={page === pages || pages === 0}
            >
                ❯
            </PageItem>
            <PageItem
                className='page-last'
                onClick={() => paginate(pages)}
                disabled={page === pages || pages === 0}
            >
                ❯❯
            </PageItem>
        </Paginate>
    );
};
