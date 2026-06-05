import { useContext } from "react";
import { UserContext } from "./context/userContext";

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

async function sendRequest(friendId) {
    const request  = await authFetch(`http://localhost:3000/user/add-friend/${friendId}`, {
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

export {handleAccept, handleReject, handleUnfriend, sendRequest, blockUser};