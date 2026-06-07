import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/userContext';
import NavBar from './nav';
import CreatePost from './createPost';
import AddComment from './addComment';

function Profile() {
	const { user, setUser, authFetch } = useContext(UserContext);
	const [settingToggle, setSettingToggle] = useState(false);
	const [posts, setPosts] = useState([]);

	async function userPosts() {
		const response = await authFetch(
			`http://localhost:3000/user/page/${user.safeUser.id}`,
		);
		const data = await response.json();
		setPosts(data.post);
	}

	useEffect(() => {
		userPosts();
	}, [user]);

	function toggleSettings() {
		setSettingToggle(prev => !prev);
	}
	async function switchToPublic() {
		setUser(prev => ({
			...prev, safeUser: {...prev.safeUser, isPublic: true},
			}));
		const publicProfile = await authFetch(`http://localhost:3000/user/public`, {
			method: 'POST',
		})
		setSettingToggle(false);
	}

	async function switchToPrivate() {
		setUser(prev => ({
			...prev, safeUser: {...prev.safeUser, isPublic: false},
			}));
		const privateProfile = await authFetch(`http://localhost:3000/user/private`, {
			method: 'POST',
		})
		setSettingToggle(false);
	}
	function openSettings() {
		setSettingToggle(prev => !prev);

	}
	return (
		<>
		<header>
		<h1> Barely Social</h1>
			<NavBar />
			</header>
			<div className="profile">
				<img src='./public/user.svg' alt='user' className="avatar" />
			{user && <h2>{user.safeUser.userName}</h2>}
			<button className='settings' onClick={openSettings}>
				<i className="fa-solid fa-gear"></i>
				Settings
			</button>
			 {settingToggle && (
  <div className="settings-panel">
    {user?.safeUser?.isPublic ? (
      <button onClick={switchToPrivate}>Switch to private</button>
    ) : (
      <button onClick={switchToPublic}>Switch to public</button>
    )}
  </div>
)}
			</div>
			<CreatePost
				onNewPost={(newPost) => setPosts((prev) => [newPost, ...prev])}
			/>
			{posts.map((post) => (
				<div key={post.id} className="post">
					<div className="post-header">
					<p>{post.postBody}</p>
					<p className="date">
						{post.createdAt?.split('T')[0]?.split('-').reverse().join('/')}
					</p>
					</div>
					<div className="comments">
						{post.comments?.map((comment) => (
							<div key={comment.id} className="comment">
								<p>{comment.commentText}</p>
								<p className="comment-author">- {comment.author?.userName}</p>
							</div>
						))}
						{user && (
							<AddComment
								postId={post.id}
								onCommentAdded={(newComment) => {
									setComments((prevComments) => [...prevComments, newComment]);
								}}
							/>
						)}
					</div>
				</div>
			))}
		</>
	);
}

export default Profile;
