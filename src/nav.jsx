import { useContext, useState } from 'react';
import { UserContext } from './context/userContext';
import { Link } from 'react-router';

function navBar() {
	const { user, authFetch } = useContext(UserContext);
	const [searchUser, setSearchUser] = useState('');
	async function search(e) {
		e.preventDefault();
		const response = await fetch(`http://localhost:3000/search?q=${searchUser}`);
		const data = await response.json();
		console.log('search results', data);
		setSearchUser('');
	}
	if (user) {
		return (
			<nav>
				<div>
				<Link to="/">Home</Link>
				<Link to="/profile">Profile</Link>
				<Link to="/friendsList">Friends</Link>
				</div>
				<form onSubmit={search}>
					<input 
						type='search' 
						placeholder='Search...' 
						value={searchUser}
						onChange={(e) => setSearchUser(e.target.value)}
					/>
					<button type='submit'>Search</button>
				</form>
				<p className="logout"
									onClick={() => {
										localStorage.removeItem('token');
										window.location.href = '/';
									}}
								>
									Logout
								</p>
			</nav>
		);
	} else {
		return (
			<nav>
				<Link to="/">Home</Link>
				<Link to="/login">Login</Link>
				<Link to="/signUp">Sign Up</Link>
			</nav>
		);
	}
}

export default navBar;
