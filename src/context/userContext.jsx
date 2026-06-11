import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();
export function UserProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	async function authFetch(url, options = {}) {
    const token = localStorage.getItem('token');

	
    const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  // ❗ If the body is FormData, DO NOT set Content-Type
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        setUser(null);
        throw new Error('Unauthorized');
    }

    return response;
}


	useEffect(() => {
		async function validateToken() {
			const token = localStorage.getItem('token');
			
        
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
