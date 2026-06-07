import { useContext } from "react";
import { UserContext } from "./context/userContext";



async function handleAccept(friendId, authFetch) {
    setFriendship(null);
    const accept  = await authFetch(`http://localhost:3000/user/accept/${friendId}`, {
        method: 'POST'
    })
   
}

async function handleReject(friendId, authFetch) {
     setFriendship(null);
    const reject  = await authFetch(`http://localhost:3000/user/reject/${friendId}`, {
        method: 'POST'
    })
    
}

async function handleUnfriend(friendId, authFetch) {
     setFriendship(null);
    const unfriend  = await authFetch(`http://localhost:3000/user/delete/${friendId}`, {
        method: 'POST'
    })
  
}

async function sendRequest(friendId, authFetch) {
    
    const request  = await authFetch(`http://localhost:3000/user/add-friend/${friendId}`, {
        method: 'POST'
    })
   
}
async function blockUser(friendId, authFetch) {
     setFriendship(null);
    const block  = await authFetch(`http://localhost:3000/user/block/${friendId}`, {
        method: 'POST'
    })
    
}

export {handleAccept, handleReject, handleUnfriend, sendRequest, blockUser};