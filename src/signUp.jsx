import NavBar from './nav';
import { useState } from 'react';
import { useNavigate } from 'react-router';


function SignUp() {
    const navigate = useNavigate();
const [firstName, setFirstName] = useState('');
const [userName, setUserName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
   async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                firstName: firstName,
                email: email,
                password: password,
                
            })
        });
        const data = await response.json();
        if (!response.ok) {
            alert(data.message);
            return;
        }
        navigate('/');
    }

    return(
        <>
                <NavBar />
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}> 

                <label htmlFor="firstName">Name</label>
                <input type="text" placeholder="First Name" id="firstName" onChange={(e) => setFirstName(e.target.value)} />
                <label htmlFor="userName">Username</label>
                <input type="text" placeholder="Username" id="userName" onChange={(e) => setUserName(e.target.value)} />
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email" id="email" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" placeholder="Confirm Password" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
                {password !== confirmPassword && <p>Passwords do not match</p>}
                <button type="submit">Sign Up</button>
        </form>
        </>
    )
}

export default SignUp;