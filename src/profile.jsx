import {useContext, useEffect, useState} from 'react'
import { UserContext } from './context/userContext';
import NavBar from './nav';
import CreatePost from './createPost';
import AddComment from './addComment';


function Profile() {
const {user, authFetch} = useContext(UserContext);

const [posts, setPosts] = useState([]);


async function userPosts() {
    
    const response = await authFetch(`http://localhost:3000/user/page/${user.safeUser.id}`);
    const data = await response.json();
    setPosts(data);
}

useEffect(() => {
    userPosts();
}, [user]);
console.log(user)
return ( 
    <>
    <NavBar />
    <h1>Profile</h1>
   {user && <h2>{user.safeUser.userName}</h2>}
   <CreatePost onNewPost={(newPost) => setPosts(prev => [newPost, ...prev])} />
    {posts.map((post) => (
        <div key={post.id} className="post">
            <p>{post.postBody}</p>
            <p className="date">{post.createdAt?.split("T")[0]?.split("-").reverse().join("/")}</p>
             <div className='comments'>
            {post.comments?.map((comment) => <div key={comment.id} className='comment'>
                
                <p>{comment.commentText}</p>
                <p className='comment-author'>- {comment.author?.userName}</p>
                </div>) }
           {user && <AddComment postId={post.id} onCommentAdded={(newComment) => {
            setComments(prevComments => [...prevComments, newComment]);
           }} />}
           
            </div>
        </div>
    ))}
    </>
)

}


export default Profile;