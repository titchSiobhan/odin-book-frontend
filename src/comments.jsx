import { useContext } from 'react';
import { UserContext } from './context/userContext';
import { Link } from 'react-router';
import { CommentCards } from './profileCards';
import DeletePost from './delete';

function GetComments({ post, comment, authFetch }) {
	const { user } = useContext(UserContext);
	return (
		<div className="comment">
			<div className="single-comment">
				<p>{comment.commentText}</p>
				{user && user.safeUser.id === post.author.id ? (
					<Link to={`/profile`}>
						<div className="author">
							<CommentCards comment={comment} author={comment.author} />
						</div>
					</Link>
				) : (
					<Link to={`/user/profile/${comment.author.id}`}>
						<div className="author">
							<CommentCards
								comment={comment}
								author={comment.author}
								className="avatar"
							/>
						</div>
					</Link>
				)}
			</div>
		</div>
	);
}

export default GetComments;
