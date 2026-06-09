import { useState, useContext } from 'react';
import { UserContext } from './context/userContext';

function AddComment({ postId, onCommentAdded }) {
    const [commentText, setCommentText] = useState('');
    const { user,authFetch } = useContext(UserContext);
    
    async function submitComment(e) {
        e.preventDefault();
        const response = await authFetch(`http://localhost:3000/post/${postId}/add-comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                commentText,
                userId: user.safeUser.id
            })
        });
        const newComment = await response.json();
        if (response.ok) {
            onCommentAdded(newComment)
            setCommentText('');
        }
    }

    return (
        <>
        <form onSubmit={submitComment} className="comment-form">
            <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Add a comment..." />
            <button type="submit" >
                Submit
            </button>
        </form>
        </>
    )
}

export default AddComment;