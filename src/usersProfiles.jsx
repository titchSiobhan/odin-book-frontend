import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { UserContext } from './context/userContext';
import NavBar from './nav';
import {handleAccept, handleReject, handleUnfriend, blockUser} from './friendFunctions';
import AddComment from './addComment';

function UsersProfiles() {
	const { userId } = useParams();

	const [otherUser, setOtherUser] = useState(null);
	const [posts, setPosts] = useState([]);
	const { user, authFetch } = useContext(UserContext);
    const [comments, setComments] = useState([]);

	async function GetUser() {
		const response = await authFetch(
			`http://localhost:3000/user/profile/${userId}`,
		);
		const data = await response.json();

		setOtherUser(data.user);
	}

	async function GetPosts() {
		const response = await fetch(`http://localhost:3000/user/page/${userId}`);
		const data = await response.json();

		setPosts(data.post);
	}
	
    

	useEffect(() => {
		if (!userId) return;
		GetUser(userId);
		GetPosts(userId);
	}, [userId]);

	return (
		<div>
            <h1> Barely Social</h1>
			<NavBar />
			<h1>Users Profiles</h1>
			<div>{otherUser && <h2>{otherUser.userName}</h2>}</div>
          
			{posts.map((post) => {
                
                return (
                    <div key={post.id}>
                        <p>{post.postBody}</p>
                        <p className="date">{post.createdAt?.split("T")[0]?.split("-").reverse().join("/")}</p>

                        <div className='comments'>
                            {post.comments?.map((comment) => <div key={comment.id}><p>{comment.commentText}</p><p>{comment.userName}</p></div>)}
                        </div>
                        {user ? <>
                        <button onClick={() => {likePost(post.id)}}>Like</button> 
                        <AddComment postId={post.id} onCommentAdded={(newComment) => {
            setComments(prevComments => [...prevComments, newComment]);
           }} /> </>
                        : console.log('no user')}
                    </div>
                )
            })}
		</div>
	);
}

export default UsersProfiles;
