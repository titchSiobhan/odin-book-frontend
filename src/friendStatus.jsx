import {useState, useEffect} from 'react';
import { PostCards } from './profileCards';
import { Link } from 'react-router';

function Friends({user, authFetch}) {
const [friends, setFriends] = useState([]);
async function getFriends() {
    const response = await authFetch('http://localhost:3000/friends'),
        data = await response.json();
        setFriends(data);
}
useEffect(() => {
    getFriends();
}, [user]);



return(
    <div >
      <h2>Friends</h2>
      { friends.map(friend => (
        <div key={friend.id}>
         
          {friend.status === 'accepted' && <>
          {user?.safeUser.id === friend.requester.id ? 
          <div>
            <Link to={`/user/profile/${friend.receiver.id}`}>
            <img src={friend.receiver.profileImage || '/user.svg'} alt="user" className="avatar" />
            <p>{friend.receiver.userName}</p></Link>
          </div> : 
          <div>
            <Link to={`/user/profile/${friend.requester.id}`}>
            <img src={friend.requester.profileImage || '/user.svg'} alt="user" className="avatar" /><p>{friend.requester.userName}</p> 
            </Link></div>
          }
          
          </>}
          
        </div>
      ))}
    </div>
)
}

export default Friends ;