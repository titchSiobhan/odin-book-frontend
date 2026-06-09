import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { UserContext } from './context/userContext';
import NavBar from './nav';
import {
	handleAccept,
	handleReject,
	handleUnfriend,
	blockUser,
	sendRequest,
} from './friendFunctions';
import AddComment from './addComment';

import { Link } from 'react-router';
import GetComments from './comments';
import { PostCards, CommentCards } from './profileCards';

function UsersProfiles() {
	const { userId } = useParams();

	const [otherUser, setOtherUser] = useState(null);
	const [posts, setPosts] = useState([]);
	const { user, authFetch } = useContext(UserContext);
	const [comments, setComments] = useState([]);
	const [friendship, setFriendship] = useState([]);

	async function getFriends() {
		const response = await authFetch(
				`http://localhost:3000/user/profile/friend/${userId}`,
			),
			data = await response.json();
		setFriendship(data.friendship);
	}
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
		getFriends(userId);
	}, [userId]);

	function interpretFriendship(user, otherUser) {
		if (!friendship) return 'none';

		if (friendship.status === 'accepted') return 'friends';

		if (friendship.status === 'pending') {
			if (friendship.requesterId === user) return 'pending_sent';
			if (friendship.receiverId === user) return 'pending_received';
		}

		return 'none';
	}

	const status = user?.safeUser
		? interpretFriendship(user.safeUser.id, friendship)
		: 'none';

	return (
		<>
			<header>
				<h1> Barely Social</h1>
				<NavBar />
			</header>

			
				<div className='profile'>
					{otherUser && (
						<div>
							<img
								src={otherUser.profileImage || '/user.svg'}
								alt="user"
								className="avatar profilePic"
							/>
							{user && <h2>{otherUser.userName}</h2>}
						</div>
					)}
				
				{otherUser && user && (
					<div>
						{status === 'friends' && (
							<button onClick={() => handleUnfriend(otherUser.id, authFetch)}>
								<i className="fa-solid fa-user-slash"></i>Unfriend
							</button>
						)}

						{status === 'pending_sent' && (
							<button disabled>Request Sent</button>
						)}

						{status === 'pending_received' && (
							<>
								<button onClick={() => handleAccept(otherUser.id, authFetch)}>
									Accept
								</button>
								<button onClick={() => handleReject(otherUser.id, authFetch)}>
									<i className="fa-solid fa-user-slash"></i>Reject
								</button>
							</>
						)}

						{status === 'none' && (
							<button onClick={() => sendRequest(otherUser.id, authFetch)}>
								<i className="fa-solid fa-user-plus"></i>Add Friend
							</button>
						)}
					</div>
				)}
				</div>

				<div className="posts">
					{!posts.length && <h2 className='posts'>No posts yet</h2>}
					{posts.map((post) => {
						return (
							<div key={post.id} className="post">
								<div className="post-header">
									<p>{post.postBody}</p>
									{post.image && (
										<img src={post.image} alt="post" className="post-image" />
									)}
									<p className="date">
										{post.createdAt
											?.split('T')[0]
											?.split('-')
											.reverse()
											.join('/')}
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
								</div>
								{user ? (
									<>
										<button
											onClick={() => {
												likePost(post.id);
											}}
										>
											Like
										</button>
										<AddComment
											className="add-comment"
											postId={post.id}
											onCommentAdded={(newComment) => {
												setComments((prevComments) => [
													...prevComments,
													newComment,
												]);
											}}
										/>{' '}
									</>
								) : (
									console.log('no user')
								)}
							</div>
						);
					})}
				</div>
			
		</>
	);
}

export default UsersProfiles;
