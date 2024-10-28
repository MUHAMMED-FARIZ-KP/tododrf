import React, { useState } from 'react';
import axios from 'axios';

function Login({ setAuthenticated }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/login/', { username, password });
            localStorage.setItem('token', response.data.token);
            setAuthenticated(true);
            setMessage('Login successful');
        } catch (error) {
            setMessage('Login failed');
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        try {
            await axios.post('http://127.0.0.1:8000/auth/register/', { username, password });
            setMessage('Registration successful. Please login.');
            setIsLogin(true);
        } catch (error) {
            setMessage('Registration failed');
        }
    };

    return (
        <div style={styles.container}>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit} style={styles.form}>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={styles.input} />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />

                {!isLogin && (
                    <>
                        <label>Confirm Password:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={styles.input} />
                    </>
                )}

                <button type="submit" style={styles.button}>{isLogin ? 'Login' : 'Register'}</button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
            <button onClick={() => setIsLogin(!isLogin)} style={styles.toggleButton}>
                {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
        </div>
    );
}

const styles = { /* (existing styles) */ };

export default Login;
