import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router';
import { useContext } from 'react';
import { UserContext } from './context/userContext';
import NavBar from './nav';
import CreatePost from './createPost';

import AddComment from './addComment';

function HomePage() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const {user, authFetch, loading} = useContext(UserContext);
    const getPosts = async () => {	
		const response = await authFetch('http://localhost:3000/home'),
			data = await response.json();
            setPosts(data);
	
}

const getComments = async () => {
    const response = await authFetch('http://localhost:3000/comments'),
        data = await response.json();
        setComments(data);
}
useEffect(() => {
    getPosts();
}, []);


if (loading) return <p>Loading...</p>
async function likePost(postId) {
   const response = await authFetch(`http://localhost:3000/post/${postId}/like`, {
    method: 'POST'
   })
const data = await response.json();
    console.log("liked post", postId)
}
   async function addPost(newPost) {
    setPosts(prev => [newPost, ...prev]);
   } 

//    function openPost(postId) {
//     console.log("open post", postId)
//    }

	return <>
   <header>
		<h1> Barely Social</h1>
			<NavBar />
			</header>
<Outlet />
{user && <CreatePost onNewPost={addPost} />}
 { posts.map((post) => <div key={post.id} className="post">
    <div className="post-header" >
        <h3>{post.author?.userName}</h3>
        <p>{post.postBody}</p>
        <p className="date">{post.createdAt?.split("T")[0]?.split("-").reverse().join("/")}</p>
        </div>
        <div className='likes'>
        
            {user &&  <button onClick={() => likePost(post.id)}>Like</button>}
         
        <p>{post.likes?.length ?? 0} {post.likes.length === 1 ? 'Like ': 'Likes'}</p>
        </div>
        <div className='comments'>
            {post.comments?.map((comment) => <div key={comment.id} className='comment'>
                
                <p>{comment.commentText}</p>
                <p className='comment-author'>- {comment.author?.userName}</p>
                </div>) }
           {user && <AddComment postId={post.id} onCommentAdded={(newComment) => {
            setComments(prevComments => [...prevComments, newComment]);
           }} />}
           
            </div>
        </div>)}

    </>;
}

export default HomePage;
