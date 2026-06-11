import { useEffect, useState, useContext, useRef } from 'react';
import { Link, Outlet } from 'react-router';

import { UserContext } from './context/userContext';
import NavBar from './nav';
import CreatePost from './createPost';
import AddComment from './addComment';
import GetComments from './comments';
import { PostCards } from './profileCards';
import DeletePost from './delete';
import Friends from './friendStatus';

function HomePage() {
	const [postType, setPostType] = useState('all');
	const [allPosts, setAllPosts] = useState([]);
	const [friendPosts, setFriendPosts] = useState([]);
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [comments, setComments] = useState([]);
	const { user, authFetch, loading } = useContext(UserContext);
	const loaderRef = useRef(null);
	const [postSettingsId, setPostSettingsId] = useState(null);

useEffect(() => {
		if (!hasMore) return;

		if (postType === 'all') {
			getPosts();
		} else {
			getFriendsPost();
		}
	}, [page, postType]);

	// infinite scroll
	useEffect(() => {
		const target = loaderRef.current;
		if (!target) return;

		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && hasMore) {
				setPage((prev) => prev + 1);
			}
		});

		observer.observe(target);

		return () => observer.unobserve(target);
	}, [hasMore]);

	
	//all posts
	

	const getPosts = async () => {
		const response = await authFetch(
				`http://localhost:3000/home?page=${page}&limit=10`,
			),
			data = await response.json();

		if (data.post.length === 0) {
			setHasMore(false);
			return;
		}
		setAllPosts((prev) => {
			const updated = [...prev, ...data.post];
			if (postType === 'all') setPosts(updated);
			return updated;
		});
	};

	//friend post
	const getFriendsPost = async () => {
		const response = await authFetch(
				`http://localhost:3000/home/friends?page=${page}&limit=10`,
			),
			data = await response.json();
		if (data.friendPost.length === 0) {
			setHasMore(false);
			return;
		}
		setFriendPosts((prev) => {
			const updated = [...prev, ...data.friendPost];
			if (postType === 'friends') setPosts(updated);
			return updated;
		});
	};

	// comments
	const getComments = async () => {
		const response = await authFetch('http://localhost:3000/comments'),
			data = await response.json();
		setComments(data);
	};

	

	

	function addCommentToPost(postId, newComment) {
		setPosts((prev) =>
			prev.map((post) =>
				post.id === postId
					? { ...post, comments: [...post.comments, newComment] }
					: post,
			),
		);
	}
	async function toggleLike(postId) {
		const response = await authFetch(
			`http://localhost:3000/post/${postId}/like`,
			{
				method: 'POST',
			},
		);
		const data = await response.json();

		setPosts((prev) =>
			prev.map((post) =>
				post.id === postId
					? {
							...post,
							likes: post.likes + 1,
						}
					: post,
			),
		);
	}

	async function addPost(newPost) {
		setPosts((prev) => [newPost, ...prev]);
	}
	
{loading && <p>Loading...</p>}

	return (
		<>
			<header>
				<h1> Barely Social</h1>
				<NavBar />
			</header>
			<Outlet />
			{user && (
				<div className="create-post">
					{' '}
					<CreatePost onNewPost={addPost} />
					<select
						value={postType}
						onChange={(e) => {
							setPostType(e.target.value);

							setPosts([]);
							setPage(1);
							setHasMore(true);
						}}
					>
						<option value="all">All Posts</option>
						<option value="friends">Friends Only</option>
					</select>
				</div>
			)}
			{user && (
				<div className="friends">
					<Friends user={user} authFetch={authFetch} />
				</div>
			)}
			<div className={user ? 'posts' : 'postsNoUser'}>
				{posts.map((post) => (
					<div key={post.id} className="post">
						<div className="post-header">
							<div className="nonePostPost">
								{user && user.safeUser.id === post.author.id ? (
									<Link to={`/profile`} className="author">
										<div className="author">
											<PostCards post={post} author={post.author} />
										</div>
									</Link>
								) : (
									<Link
										to={`/user/profile/${post.author.id}`}
										className="author"
									>
										<div className="author">
											<PostCards post={post} author={post.author} />
										</div>
									</Link>
								)}
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
						<div className="likes">
							{user && (
								<button onClick={() => toggleLike(post.id)}>Like</button>
							)}

							<p>
								{post.likes?.length ?? 0}{' '}
								{post.likes.length === 1 ? 'Like ' : 'Likes'}
							</p>
						</div>

						{/* //comments */}
						<div className="comments">
							{post.comments?.map((comment) => (
								<GetComments
									key={comment.id}
									comment={comment}
									user={user}
									post={post}
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
				<div ref={loaderRef}
					
				></div>
			</div>
		</>
	);
}

export default HomePage;
