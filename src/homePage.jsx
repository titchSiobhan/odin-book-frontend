import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router';
import { useContext } from 'react';
import { UserContext } from './context/userContext';
import NavBar from './nav';
import CreatePost from './createPost';

function HomePage() {
    const [posts, setPosts] = useState([]);
    const {user, authFetch, loading} = useContext(UserContext);
    const getPosts = async () => {	
		const response = await authFetch('http://localhost:3000/home'),
			data = await response.json();
            setPosts(data);
	
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

	return <>
    <h1> Barely Social</h1>
<NavBar />
<Outlet />
{user && <CreatePost onNewPost={addPost} />}
 { posts.map((post) => <div key={post.id}>
        <h3>{post.author?.userName}</h3>
        <p>{post.postBody}</p>
        <p className="date">{post.createdAt?.split("T")[0]?.split("-").reverse().join("/")}</p>
        <div className='likes'>
        <button onClick={() => likePost(post.id)}>Like</button>
        <p>{post.likes?.length ?? 0} likes</p>
        </div>
        </div>)}

    </>;
}

export default HomePage;
