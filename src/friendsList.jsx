import {useState, useEffect} from 'react'
import { UserContext } from './context/userContext';
import { useContext } from 'react';
import NavBar from './nav';

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
async function handleAccept(friendId) {
    const accept  = await authFetch(`http://localhost:3000/user/accept/${friendId}`, {
        method: 'POST'
    })
    getFriends();
}

async function handleReject(friendId) {
    const reject  = await authFetch(`http://localhost:3000/user/reject/${friendId}`, {
        method: 'POST'
    })
    getFriends();
}

async function handleUnfriend(friendId) {
    const unfriend  = await authFetch(`http://localhost:3000/user/delete/${friendId}`, {
        method: 'POST'
    })
    getFriends();
}

async function blockUser(friendId) {
    const block  = await authFetch(`http://localhost:3000/user/block/${friendId}`, {
        method: 'POST'
    })
    getFriends();
}
console.log("friends are", friends)
return (
    <>
    <NavBar />
    {user && <h1>{user.safeUser.userName}'s Friends</h1>}
   
   {friends.length > 0 ? (
    <ul>
        {
        friends.map(friend => {
            const requester = friend.requester
            const receiver = friend.receiver
            const me = user?.safeUser
            if (!requester || !receiver || !me) return null;
            const other = requester.userName === me.userName ? receiver : requester;
            if (friend.status !== 'accepted'){ 
                return <li key={friend.id}>{other.userName}
                <button onClick={() => handleAccept(other.id)}>Accept</button>
                <button onClick={() => handleReject(other.id)}>Reject</button>
                <button onClick={() => blockUser(other.id)}>Block</button>
                </li>
            }

            return <li key={friend.id}>{other.userName}
            <button onClick={() => handleUnfriend(other.id)}>Unfriend</button>
            <button onClick={() => blockUser(other.id)}>Block</button>
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