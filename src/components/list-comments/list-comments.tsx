import React from 'react';
import { Table } from 'react-bootstrap';
import Spinner from '../spinner';
import { IComment } from '../../stores/CommentsStore';
import './list-comments.css';

interface ListCommentsProps {
    comments: IComment[]
    isLoading?: boolean
    postId: string
}

// @ts-ignore
// const commentsShow: React.FC<{comments: IComment[]}> = ({comments}) => {
//     comments.map(comment => {
//         const { id, name, body } = comment
//         return (
//             <>
//                 <tr key={id}>
//                     <tr>
//                         <td>{id}</td>
//                     </tr>
//                     <tr>
//                         <td>{name}</td>
//                     </tr>
//                     <tr>
//                         <td>{body}</td>
//                     </tr>
//                     {
//                         <tr>
//                             {
//                                 // @ts-ignore
//                                 comment.children ? commentsShow(comment.children): null
//                             } 
//                         </tr>
//                     }
//                 </tr>
//             </>
//         )
//     })
//     return
// }

export const ListComments: React.FC<ListCommentsProps> = ({ postId, comments, isLoading }) => {

    return (
        <>
            <h3 className="user-id">Comments</h3>
                    {
                        isLoading ? (
                            <div className='loading-container'>
                                <Spinner />
                            </div>
                        ) : (
                            // @ts-ignore
                            // commentsShow(comments)
                            comments.map(comment => {
                                const { id, name, body } = comment
                                return (
                                    <>
                                    <Table className='list-post' hover size="sm" responsive>
                                        <thead>

                                        </thead>
                                        <tbody>
                                            <tr key={`comment-${id}`} className='comments-container'>
                                            </tr>   
                                            <tr>
                                                <th className='id-comment align-middle text-center' rowSpan={2}>ID: {id}</th>
                                                <th className='header-comment'>Name user</th>
                                                <td>{name}</td>
                                            </tr>
                                            <tr>
                                                <th className='header-comment'>Comment</th>
                                                <td>{body}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    </>
                                )
                            })
                        )
                    }
        </>
    )
}
