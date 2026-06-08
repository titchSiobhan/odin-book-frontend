import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/userContext';
import NavBar from './nav';
import CreatePost from './createPost';
import AddComment from './addComment';
import GetComments from './comments';
import {PostCards, ProfileCards} from './profileCards'

function Profile() {
	const { user, setUser, authFetch } = useContext(UserContext);
	const [settingToggle, setSettingToggle] = useState(false);
	const [uploadToggle, setUploadToggle] = useState(false);
	const [posts, setPosts] = useState([]);
	const [ postSettingsId, setPostSettingsId] = useState(null);

	async function userPosts() {
		const response = await authFetch(
			`http://localhost:3000/user/page/${user?.safeUser.id}`,
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

	function changeProfilePic() {
		setUploadToggle(prev => !prev);
	}
	async function uploadProfilePic(e) {
		e.preventDefault();
		
		const file = e.target.profilePic.files[0];
		const formData = new FormData();
		formData.append('image', file);
		try{
		const response = await authFetch('http://localhost:3000/user/profile/update', {
			method: 'POST',
			body: formData
			
		})
		
	}
	catch (error) {
		console.error(error);
	}
	}

	function openPostSettings(postId) {
		setPostSettingsId(prev =>
    prev === postId ? null : postId
  );
	}

	async function deletePost(postId) {
		await authFetch(`http://localhost:3000/post/delete/${postId}`, {
			method: 'DELETE',
		});
		setPosts((prev) => prev.filter((post) => post.id !== postId));
	}
	return (
		<>
		<header>
		<h1> Barely Social</h1>
			<NavBar />
			</header>
			<div className="profile">
			<PostCards user={user?.safeUser} author={user?.safeUser} />
			</div>
			<CreatePost
				onNewPost={(newPost) => setPosts((prev) => [newPost, ...prev])}
			/>
			{posts.map((post) => (
				<div key={post.id} className="post">
					<div className="post-header">
						{user && user.safeUser.id === post.author.id && (
							<button onClick={() => openPostSettings(post.id)}>Settings</button>
						)}
						{postSettingsId === post.id && post.author.id === user.safeUser.id && (
							<button onClick={() => deletePost(post.id)}>Delete</button>
						)}
					<p>{post.postBody}</p>
					{post.image && (
							<img src={post.image} alt="post" className="post-image" />
						)}
					<p className="date">
						{post.createdAt?.split('T')[0]?.split('-').reverse().join('/')}
					</p>
					</div>
					<div className="comments">
						{post.comments?.map((comment) => (
							<GetComments key={comment.id} comment={comment} user={user} post={comment} />
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
