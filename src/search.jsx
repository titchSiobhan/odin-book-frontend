import { useContext, useState, useEffect } from 'react';
import { UserContext } from './context/userContext';
import NavBar from './nav';
import { useSearchParams } from 'react-router';
import { Link } from 'react-router';

function Search() {
	const { user } = useContext(UserContext);
	const [results, setResults] = useState([]);
	const [searchParams] = useSearchParams();
	const query = searchParams.get('q');

	useEffect(() => {
		async function searchResults() {
			if (!query) return;
			const response = await fetch(`https://odin-book-backend-9o10.onrender.com/search?q=${query}`);
			const data = await response.json();
			setResults(data);
		}
		searchResults();
	}, [query]);

	
	return (
		<>
		<header>
		<h1> Barely Social</h1>
			<NavBar />
			</header><div className='search-results'>
			<h1 c>Search Results for "{query}"</h1>

			{results.users && results.users.length > 0 ? (
				<div>
					<ul>
						{results.users.map((users) => {
							const isCurrentUser = user?.safeUser?.id === users.id;
							return (
								<li key={users.id}>
									{isCurrentUser ? (
										<span>
											<img src='./public/user.svg' className='avatar' />
											{' '}
											You<Link to="/profile">{users.userName}</Link>
										</span>
									) : (
										<span>
											<img src='./public/user.svg' className='avatar' />
											<Link to={`/user/profile/${users.id}`}>{users.userName}</Link>
										</span>
									)}
								</li>
							);
						})}
					</ul>
				</div>
			) : (
				<p>No users found</p>
			)}
			</div>
		</>
	);
}

export default Search;
