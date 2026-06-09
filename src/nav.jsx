import { useContext, useState } from 'react';
import { UserContext } from './context/userContext';
import { Link, useNavigate } from 'react-router';

function navBar() {
	const { user, authFetch } = useContext(UserContext);
	const [searchUser, setSearchUser] = useState('');
	const navigate = useNavigate();
	const [toggle, setToggle] = useState(false);
	async function search(e) {
		e.preventDefault();
		navigate(`/search?q=${searchUser}`);
		setSearchUser('');
	}
	function menuToggle() {
		setToggle((prev) => !prev);
		
	}
	
	if (user) {
		return (
			<>
		 <i className="fa-solid fa-bars menu" onClick={menuToggle} id="menu" ></i> 
			 <nav className={toggle ? "nav active" : "nav"}>
			
				<div className="links">
				<Link to="/">Home</Link>
				<Link to="/profile">Profile</Link>
				<Link to="/friendsList">Friends</Link>
				</div>
				<form onSubmit={search} className="search">
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
			</>
		);
	} else {
		return (
			<>
			<i className="fa-solid fa-bars menu" onClick={menuToggle} id="menu" ></i> 
			<nav className={toggle ? "nav active" : "nav"}>
				
				<Link to="/">Home</Link>
				<Link to="/login">Login</Link>
				<Link to="/signUp">Sign Up</Link>
				
			</nav>
			</>
		);
	}
}

export default navBar;
