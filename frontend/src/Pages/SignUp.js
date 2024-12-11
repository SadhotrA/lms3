import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        // Validation
        if (!name || !email || !password) {
            return handleError('Name, email, and password are required.');
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return handleError('Please enter a valid email address.');
        }
        if (password.length < 6) {
            return handleError('Password must be at least 6 characters long.');
        }

        try {
            setIsLoading(true); // Start loading
            const url = `http://localhost:8080/auth/signup`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                const details = error?.details?.[0]?.message || 'An error occurred. Please try again.';
                handleError(details);
            } else {
                handleError(message || 'Signup failed.');
            }
        } catch (err) {
            handleError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false); // End loading
        }
    };

    return (
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        onChange={handleChange}
                        type="text"
                        name="name"
                        autoFocus
                        placeholder="Enter your name..."
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="Enter your email..."
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Enter your password..."
                        value={signupInfo.password}
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing up...' : 'Signup'}
                </button>
                <span>
                    Already have an account? <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
}

export default Signup;
