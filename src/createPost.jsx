import {useContext, useState} from 'react';
import { UserContext } from './context/userContext';

function CreatePost({onNewPost}) {
    const {user, authFetch} = useContext(UserContext);
    
   const [postBody, setPostBody] = useState('');
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await authFetch('http://localhost:3000/create-post', {
            method: 'POST',
            body: JSON.stringify({
                postBody: postBody,
                userId: user.safeUser.id
            })
        });
            const newPost = await response.json();
            onNewPost(newPost);
            setPostBody('');
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="postBody">What's on your mind?</label>
            <textarea id="postBody" value={postBody} onChange={(e) => setPostBody(e.target.value)}></textarea>
            <button type="submit">Post</button>
        </form>
        </>
    )
}

export default CreatePost;  