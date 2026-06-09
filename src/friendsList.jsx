import {useState, useEffect} from 'react'
import { UserContext } from './context/userContext';
import { useContext } from 'react';
import NavBar from './nav';
import {handleAccept, handleReject, handleUnfriend, blockUser} from './friendFunctions';
import {Link} from 'react-router';
import {PostCards} from './profileCards'

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


return (
    <>
    <header>
		<h1> Barely Social</h1>
			<NavBar />
			</header>
    {user && <h2 className='title'>{user.safeUser.userName}'s Friends</h2>}
   <div className="friend-list">
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
                
            
                return <li key={friend.id} className='friendsCard'><div className='name'><PostCards user={other} author={other}  /></div>
                <button onClick={() => handleAccept(other.id, authFetch)}><i className="fa-solid fa-user-plus"></i>Accept</button>
                <button onClick={() => handleReject(other.id, authFetch)}><i className="fa-solid fa-user-slash"></i>Reject</button>
                <button onClick={() => blockUser(other.id, authFetch)}><i className="fa-solid fa-user-slash"></i>Block</button>
                </li>
            } else if (friend.status === 'pending' && me.id === requester.id) {
                return <li key={friend.id} className='friendsCard'><Link to={`/user/profile/${other.id}`}> <div className='name'><PostCards user={other} author={other} /></div>
                <p>Request pending</p>
                <button onClick={() => blockUser(other.id, authFetch)}> <i className="fa-solid fa-user-slash"></i>Block</button>
                </Link>
                </li>
            } 

            return <li key={friend.id} className='friendsCard'>
                <Link to={`/user/profile/${other.id}`}><div className='name'><PostCards user={other} author={other} /></div>
            <button onClick={() => handleUnfriend(other.id)}><i className="fa-solid fa-user-slash"></i>Unfriend</button>
            <button onClick={() => blockUser(other.id)}><i className="fa-solid fa-user-slash"></i>Block</button>
            </Link>
            </li>
        })}
    </ul>
   ) : (
    <p>No friends yet</p>
   )}
   </div>
   
    </>
)

}


export default FriendsList;