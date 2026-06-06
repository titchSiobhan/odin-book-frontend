import { useContext } from "react";
import { UserContext } from "./context/userContext";



async function handleAccept(friendId, authFetch) {
    const accept  = await authFetch(`http://localhost:3000/user/accept/${friendId}`, {
        method: 'POST'
    })
   
}

async function handleReject(friendId, authFetch) {
    
    const reject  = await authFetch(`http://localhost:3000/user/reject/${friendId}`, {
        method: 'POST'
    })
    
}

async function handleUnfriend(friendId, authFetch) {
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
    const block  = await authFetch(`http://localhost:3000/user/block/${friendId}`, {
        method: 'POST'
    })
    
}

export {handleAccept, handleReject, handleUnfriend, sendRequest, blockUser};