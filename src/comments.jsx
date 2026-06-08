import {useContext} from 'react'
import { UserContext } from './context/userContext'; 
import { Link } from 'react-router';
import {PostCards} from './profileCards'

function GetComments({post, comment}) {
    const {user} = useContext(UserContext);
    return (
							<div  className="comment">
								<p>{comment.commentText}</p>
								{user && user.safeUser.id === post.author.id ? (
							<Link to={`/profile`}><div className="author">
								<PostCards post={comment}  author={post.author}/>
							</div></Link>) : (<Link to={`/user/profile/${comment.author.id}`}>
							<div className="author">
								<PostCards post={comment}  author={post.author}/>
							</div>
						</Link>)
						}
							</div>
						)}


export default GetComments