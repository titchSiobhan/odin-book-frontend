import {useContext, useEffect} from 'react'
import { UserContext } from './context/userContext';
import NavBar from './nav';
import {useNavigate} from 'react-router';

function Profile() {
const {user} = useContext(UserContext);
const navigate = useNavigate();




return ( 
    <>
    <NavBar />
    <h1>Profile</h1>
    <p>Username: {user.safeUser.userName}</p>
    
    </>
)

}


export default Profile;