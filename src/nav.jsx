import { useContext } from 'react';
import { UserContext } from './context/userContext';
import { Link } from 'react-router';

function navBar() {
	const { user } = useContext(UserContext);
	if (user) {
		return (
			<nav>
				<Link to="/">Home</Link>
				<Link to="/profile">Profile</Link>
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
