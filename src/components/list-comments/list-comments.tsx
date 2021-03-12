import React, { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Spinner from '../spinner';
import { IComment } from '../../stores/CommentsStore';
import './list-comments.css';

interface ListCommentsProps {
    comments: IComment[]
    isLoading?: boolean
    postId: string
}

const commentsShow: React.FC<ListCommentsProps> = ({comments, children}) => {
    comments.map(comment => {
        const { id, name, body } = comment
        return (
            <>
                <tr key={id}>
                    <tr>
                        <td>{id}</td>
                    </tr>
                    <tr>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <td>{body}</td>
                    </tr>
                    {
                        <tr>
                            {children ? commentsShow(children): null} 
                        </tr>
                    }
                </tr>
            </>
        )
    })
}

export const ListComments: React.FC<ListCommentsProps> = ({ postId, comments, isLoading }) => {

    return (
        <>
            <h3 className="user-id">Comments</h3>
            <Table className='list-posts' bordered hover size="sm">
                <thead>
                </thead>
                <tbody>
                    {
                        isLoading ? (
                            <tr>
                                <td className='loading-container'>
                                    <Spinner />
                                </td>
                            </tr>
                        ) : (
                            commentsShow(comments)
                            // comments.map(comment => {
                            //     const { id, name, body } = comment
                            //     return (
                            //         <>
                            //             <tr key={id}>
                            //                 <tr>
                            //                     <td>{id}</td>
                            //                 </tr>
                            //                 <tr>
                            //                     <td>{name}</td>
                            //                 </tr>
                            //                 <tr>
                            //                     <td>{body}</td>
                            //                 </tr>
                            //             </tr>
                            //         </>
                            //     )
                            // })
                        )
                    }
                </tbody>
            </Table>
        </>
    )
}
