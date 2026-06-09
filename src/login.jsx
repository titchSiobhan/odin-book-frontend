import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserContext } from './context/userContext';
import NavBar from './nav';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const [message, setMessage] = useState('');

	const { setUser, user } = useContext(UserContext);
	async function handleSubmit(e) {
		e.preventDefault();
		const response = await fetch('http://localhost:3000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});
		 const data = await response.json();

   
    localStorage.setItem('token', data.token);

    
    setUser({
        safeUser: data.safeUser,
        token: data.token
    });
		 setMessage(data.error);
        if (!data.error ) {
            navigate('/');
        }
	}

	return (
		<>
		<header>
		<h1> Barely Social</h1>
			<NavBar />
			</header>
			<form onSubmit={handleSubmit} className="login-form">
				{message != '' && <p>{message}</p>}
				{email === '' && <p>Please enter your email</p>}
				{password === '' && <p>Please enter your password</p>}
				<label htmlFor="email">Email</label>

				<input
					name="email"
                    id="email"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="password">Password</label>
				<input
                id="password"
					name="password"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Login</button>
			</form>
		</>
	);
}

export default Login;
