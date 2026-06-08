import {useState, useEffect} from 'react'
import { UserContext } from './context/userContext';
import { useContext } from 'react';
import NavBar from './nav';
import {handleAccept, handleReject, handleUnfriend, blockUser} from './friendFunctions';
import {Link} from 'react-router';

function FriendsList() {
const {user, authFetch} = useContext(UserContext);
const [friends, setFriends] = useState([]);

async function getFriends() {
    const response = await authFetch('http://localhost:3000/friends'),
        data = await response.json();
        setFriends(data);
}
useEffect(() => {
    getFriends();
}, [user]);
// async function handleAccept(friendId) {
//     const accept  = await authFetch(`http://localhost:3000/user/accept/${friendId}`, {
//         method: 'POST'
//     })
//     getFriends();
// }

// async function handleReject(friendId) {
//     const reject  = await authFetch(`http://localhost:3000/user/reject/${friendId}`, {
//         method: 'POST'
//     })
//     getFriends();
// }

// async function handleUnfriend(friendId) {
//     const unfriend  = await authFetch(`http://localhost:3000/user/delete/${friendId}`, {
//         method: 'POST'
//     })
//     getFriends();
// }

// async function blockUser(friendId) {
//     const block  = await authFetch(`http://localhost:3000/user/block/${friendId}`, {
//         method: 'POST'
//     })
//     getFriends();
// }

return (
    <>
    <header>
		<h1> Barely Social</h1>
			<NavBar />
			</header>
    {user && <h2>{user.safeUser.userName}'s Friends</h2>}
   
   {friends.length > 0 ? (
    <ul>
        {
        friends.map(friend => {
            const requester = friend.requester
            const receiver = friend.receiver
            const me = user?.safeUser
            if (!requester || !receiver || !me) return null;
            const other = requester.userName === me.userName ? receiver : requester;

            if (friend.status !== 'accepted' && me.id === receiver.id) {
                
            
                return <li key={friend.id}><div className='name'>{other.userName}</div>
                <button onClick={() => handleAccept(other.id, authFetch)}><i className="fa-solid fa-user-plus"></i>Accept</button>
                <button onClick={() => handleReject(other.id, authFetch)}><i className="fa-solid fa-user-slash"></i>Reject</button>
                <button onClick={() => blockUser(other.id, authFetch)}><i className="fa-solid fa-user-slash"></i>Block</button>
                </li>
            } else if (friend.status === 'pending' && me.id === requester.id) {
                return <li key={friend.id}><div className='name'>{other.userName}</div>
                <p>Request pending</p>
                <button onClick={() => blockUser(other.id, authFetch)}> <i className="fa-solid fa-user-slash"></i>Block</button>
                </li>
            } 

            return <li key={friend.id}>
                <Link to={`/user/profile/${other.id}`}><div className='name'><img src='./public/user.svg' alt='user' className="avatar" />{other.userName}</div>
            <button onClick={() => handleUnfriend(other.id)}><i className="fa-solid fa-user-slash"></i>Unfriend</button>
            <button onClick={() => blockUser(other.id)}><i className="fa-solid fa-user-slash"></i>Block</button>
            </Link>
            </li>
        })}
    </ul>
   ) : (
    <p>No friends yet</p>
   )}
   
    </>
)
}


export default FriendsList;