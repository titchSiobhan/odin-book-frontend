import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();
export function UserProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	async function authFetch(url, options = {}) {
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        localStorage.removeItem('token');
        setUser(null);
        throw new Error('Unauthorized');
    }

    return response;
}


	useEffect(() => {
		async function validateToken() {
			const token = localStorage.getItem('token');
			console.log('hello from validate token, token is', token);
			if (!token) {
				setLoading(false);
				return;
			}
			try {
				const response = await authFetch('http://localhost:3000/me');
				const data = await response.json();

				setUser({
					safeUser: data.safeUser,
					token: data.token,
				});
				console.log('validated token, user is', data.safeUser);
			} catch (err) {
				localStorage.removeItem('token');
				setUser(null);
			}
            setLoading(false);
		}
		validateToken();
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser, authFetch, loading }}>
			{children}
		</UserContext.Provider>
	);
}
