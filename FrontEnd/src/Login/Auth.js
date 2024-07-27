// Auth.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import BgVideo from './bgvideo'; // Ensure the path is correct
import '../styles.css'; 

export const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log("Login", email, password);
            // Simulate a successful login
            setTimeout(() => {
                navigate('/');
            }, 1000); // Simulating a delay for the login process
        } else {
            console.log("Register", firstName, lastName, email, password);
            // Simulate a successful registration
            setTimeout(() => {
                setIsLogin(true);
                navigate('/auth');
            }, 1000); // Simulating a delay for the registration process
        }
    }

    return (
        <div className="app-container">
            <BgVideo />
            <div className="auth-form-container">
                <h2>{isLogin ? "Login" : "Register"}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} id="firstName" placeholder="First Name" />
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} id="lastName" placeholder="Last Name" />
                        </>
                    )}
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="youremail@gmail.com" id="email" name="email" />
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" id="password" name="password" />
                    <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
                </form>
                <button className="link-btn" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Don't have an account? Register here." : "Already have an account? Login here."}
                </button>
            </div>
        </div>
    )
}
