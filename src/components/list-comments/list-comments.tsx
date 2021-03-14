import React from 'react';
import { Table } from 'react-bootstrap';
import Spinner from '../spinner';
import { IComment } from '../../stores/CommentsStore';
import './list-comments.css';

interface ListCommentsProps {
    comments: IComment[];
    isLoading?: boolean;
}

export const ListComments: React.FC<ListCommentsProps> = ({ comments, isLoading }) => {
    if (isLoading) {
        return (
            <div className='loading-comments text-center'>
                <Spinner />
            </div>
        )
    } 

    const hasComments = !!comments.length;

    return (
        hasComments ? (
            <>  
                <div className='comments-container'>
                    <h4 className='comments-header'>Comments</h4>
                    {comments.map(comment => {
                        const { id, name, body } = comment
                        return (
                            <>
                                <Table key={id} className='comment-container' size='sm' hover responsive>
                                    <tbody>
                                        <tr>
                                            <th className='header-comment-id align-middle'>ID: {id}</th>
                                            <th className='header-comment-name'>Name user</th>
                                            <td>{name}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className='header-comment-body'>Comment</th>
                                            <td>{body}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </>
                        );
                    })}
                </div>
            </>
        ) : null
    );
};
