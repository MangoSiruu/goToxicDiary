import React, { useState, useEffect } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Retrieve the token from local storage if it exists
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      console.log('Stored Token:', storedToken); // Show the stored token in console
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://3.37.98.95:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const token = response.headers.get('Authorization') || response.headers.get('authorization');
      if (!token) {
        throw new Error('Token not found in response headers');
      }

      console.log('Token:', token); // Debugging line to check the token

      // Store the token in local storage
      localStorage.setItem('token', token);

      // Set the token in the state
      setToken(token);
      setSuccess('로그인에 성공했습니다.');
      setError(''); // Clear error message if the login is successful
    } catch (err) {
      setError(err.message);
      setSuccess(''); // Clear success message if there's an error
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default Login;
