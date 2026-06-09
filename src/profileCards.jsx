function PostCards(post, author) {
	return (
		<>
			<img
				src={post.author?.profileImage || '/user.svg'}
				alt="user"
				className="avatar"
			/>
			<h3>{post.author?.userName}</h3>
		</>
	);
}

function CommentCards(comment, author) {
	return (
		<div className="commentProfile">
			<img
				src={comment.author?.profileImage || '/user.svg'}
				alt="user"
				className="avatar"
			/>
			<h3>{comment.author?.userName}</h3>
		</div>
	);
}



export  {   PostCards, CommentCards };