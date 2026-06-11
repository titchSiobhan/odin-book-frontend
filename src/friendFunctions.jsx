import { useContext } from "react";
import { UserContext } from "./context/userContext";



async function handleAccept(friendId, authFetch) {
    setFriendship(null);
    const accept  = await authFetch(`https://odin-book-backend-9o10.onrender.com/user/accept/${friendId}`, {
        method: 'POST'
    })
   
}

async function handleReject(friendId, authFetch) {
     setFriendship(null);
    const reject  = await authFetch(`https://odin-book-backend-9o10.onrender.com/user/reject/${friendId}`, {
        method: 'POST'
    })
    
}

async function handleUnfriend(friendId, authFetch) {
     setFriendship(null);
    const unfriend  = await authFetch(`https://odin-book-backend-9o10.onrender.com/user/delete/${friendId}`, {
        method: 'POST'
    })
  
}

async function sendRequest(friendId, authFetch) {
    
    const request  = await authFetch(`https://odin-book-backend-9o10.onrender.com/user/add-friend/${friendId}`, {
        method: 'POST'
    })
   
}
async function blockUser(friendId, authFetch) {
     setFriendship(null);
    const block  = await authFetch(`https://odin-book-backend-9o10.onrender.com/user/block/${friendId}`, {
        method: 'POST'
    })
    
}

export {handleAccept, handleReject, handleUnfriend, sendRequest, blockUser};