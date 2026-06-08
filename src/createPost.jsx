import {useContext, useState} from 'react';
import { UserContext } from './context/userContext';

function CreatePost({onNewPost}) {
    const {user, authFetch} = useContext(UserContext);
    
   const [postBody, setPostBody, ] = useState('');
   let attachImage = null;

 
    async function handleSubmit(e) {
        e.preventDefault();
        const file = e.target.attachImage.files[0];
        const formData = new FormData();
        formData.append('image', file);
        formData.append('postBody', postBody);
        formData.append('userId', user.safeUser.id);
        const response = await authFetch('http://localhost:3000/create-post', {
            method: 'POST',
            body: formData
        });
            const newPost = await response.json();
            onNewPost(newPost);
            setPostBody('');
    }
    return (
        <>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <label htmlFor="postBody">What's on your mind?</label>
            <textarea id="postBody" value={postBody} onChange={(e) => setPostBody(e.target.value)}></textarea>
            <input type="file" name="attachImage" />
            <button type="submit">Post</button>
        </form>
        </>
    )
}

export default CreatePost;  