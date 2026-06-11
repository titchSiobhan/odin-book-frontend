import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/userContext';
import NavBar from './nav';
import CreatePost from './createPost';
import AddComment from './addComment';
import GetComments from './comments';
import { PostCards, CommentCards } from './profileCards';
import DeletePost from './delete';
import Friends from './friendStatus';


function Profile() {
	const { user, setUser, authFetch } = useContext(UserContext);
	const [settingToggle, setSettingToggle] = useState(false);
	const [uploadToggle, setUploadToggle] = useState(false);
	const [posts, setPosts] = useState([]);
	const [postSettingsId, setPostSettingsId] = useState(null);
	

	async function userPosts() {
		const response = await authFetch(
			`https://odin-book-backend-9o10.onrender.com/user/page/${user?.safeUser.id}`,
		);
		const data = await response.json();
		setPosts(data.post);
	}

	useEffect(() => {
		userPosts();
	}, [user]);

	function toggleSettings() {
		setSettingToggle((prev) => !prev);
	}
	async function switchToPublic() {
		setUser((prev) => ({
			...prev,
			safeUser: { ...prev.safeUser, isPublic: true },
		}));
		const publicProfile = await authFetch(`https://odin-book-backend-9o10.onrender.com/user/public`, {
			method: 'POST',
		});
		setSettingToggle(false);
	}

	async function switchToPrivate() {
		setUser((prev) => ({
			...prev,
			safeUser: { ...prev.safeUser, isPublic: false },
		}));
		const privateProfile = await authFetch(
			`https://odin-book-backend-9o10.onrender.com/user/private`,
			{
				method: 'POST',
			},
		);
		setSettingToggle(false);
	}
	function openSettings() {
		setSettingToggle((prev) => !prev);
	}

	function changeProfilePic() {
		setUploadToggle((prev) => !prev);
	}
	async function uploadProfilePic(e) {
		e.preventDefault();

		const file = e.target.profilePic.files[0];
		const formData = new FormData();
		formData.append('image', file);
		try {
			const response = await authFetch(
				'https://odin-book-backend-9o10.onrender.com/user/profile/update',
				{
					method: 'POST',
					body: formData,
				},
			);
		} catch (error) {
			console.error(error);
		}
	}

	function openPostSettings(postId) {
		setPostSettingsId((prev) => (prev === postId ? null : postId));
	}

	async function deletePost(postId) {
		await authFetch(`https://odin-book-backend-9o10.onrender.com/post/delete/${postId}`, {
			method: 'DELETE',
		});
		setPosts((prev) => prev.filter((post) => post.id !== postId));
	}

	function closePostSettings() {
		setUploadToggle(false); 
	}
	return (
		<>
			<header>
				<h1> Barely Social</h1>
				<NavBar />
			</header>
			<div className="profile">
				<PostCards user={user?.safeUser} author={user?.safeUser} />

				<button className="settings" onClick={openSettings}>
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
						<button onClick={changeProfilePic}>Upload profile picture</button>
						{uploadToggle && (
							<div className="upload-form">
								<div className='close' onClick={closePostSettings}>X</div>
								<form onSubmit={uploadProfilePic} encType="multipart/form-data" >
									<input type="file" accept="image/*" name="profilePic" />
									<button type="submit">Upload</button>
								</form>
							</div>
						)}
					</div>
				)}
			</div>
			<div className="create-post profile-create">
				<CreatePost 
					onNewPost={(newPost) => setPosts((prev) => [newPost, ...prev])}
				/>
			</div>
			<div className="profile-friends">
				<Friends user={user} authFetch={authFetch} />
			</div>
			<div className="posts profile-posts">
				{!posts.length && <h2 className='posts'>No posts yet</h2>}
				{posts.map((post) => (
					<div key={post.id} className="post">
						<div className="post-header">
							<div className='nonePostPost delete'>
							<DeletePost
								postId={post.id}
								user={user}
								authFetch={authFetch}
								post={post}
								postSettingsId={postSettingsId}
								setPostSettingsId={setPostSettingsId}
								setPosts={setPosts}
							/>
							</div>
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
								<GetComments
									key={comment.id}
									comment={comment}
									user={user}
									post={comment}
								/>
							))}
							{user && (
								<AddComment
									className="add-comment"
									postId={post.id}
									onCommentAdded={(comment) =>
										addCommentToPost(post.id, comment)
									}
								/>
							)}
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default Profile;
