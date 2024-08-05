import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import BgVideo from './bgvideo'; // Ensure the path is correct
import '../styles.css'; 
import profileImage from '../Assests/images/bg.png'; // Ensure the path is correct
import axios from 'axios';

export const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginUrl = 'http://127.0.0.1:8000/api/users/logIn/';
        const registerUrl = 'http://127.0.0.1:8000/api/users/signUp/';

        const data = isLogin
            ? { email, password }
            : { first_name: firstName, last_name: lastName, email, password, confirmPassword, age, gender, address };

        try {
            console.log(data)
            const url = isLogin ? loginUrl : registerUrl;
            const response = await axios.post(url, data);
            if (response.status === 200) {
                console.log('Response Data:', response.data);
                if (isLogin) {
                    const { access, refresh, user } = response.data;
                    localStorage.setItem('accessToken', access);
                    localStorage.setItem('refreshToken', refresh);
                    console.log(user)
                    localStorage.setItem('user', JSON.stringify(user));
                    navigate('/');
                } 
                else {
                    setIsLogin(true);
                    navigate('/auth');
                }
            }
            else if (response.status === 400) {
                console.error('There was an error!');
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div className="app-container">
            <BgVideo />
            <div className={`auth-form-container ${isLogin ? 'login' : 'register'}`}>
                <h2 className="auth-heading">{isLogin ? "Login" : "Register"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="register-layout">
                        {!isLogin && (
                            <div className="image-container">
                                <img src={profileImage} alt="Profile" className="regis-image" />
                            </div>
                        )}
                        <div className="register-inputs">
                            {!isLogin && (
                                <>
                                    <div className="input-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} id="firstName" placeholder="First Name" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} id="lastName" placeholder="Last Name" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="age">Age</label>
                                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} id="age" placeholder="Age" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="gender">Gender</label>
                                        <select value={gender} onChange={(e) => setGender(e.target.value)} id="gender">
                                            <option value="" disabled>Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </>
                            )}
                            <div className="input-group full-width">
                                <label htmlFor="email">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="youremail@gmail.com" id="email" name="email" />
                            </div>
                            {!isLogin && (
                                <>
                                    <div className="input-group full-width">
                                        <label htmlFor="password">New Password</label>
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" id="password" name="password" />
                                    </div>
                                    <div className="input-group full-width">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" id="confirmPassword" name="confirmPassword" />
                                    </div>
                                    <div className="input-group full-width">
                                        <label htmlFor="address">Address</label>
                                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} id="address" placeholder="Address" />
                                    </div>
                                </>
                            )}
                            {isLogin && (
                                <div className="input-group full-width">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" id="password" name="password" />
                                </div>
                            )}
                        </div>
                    </div>
                    <button type="submit">{isLogin ? "Submit" : "Create Account"}</button>
                </form>
                <button className="link-btn" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Don't have an account? Register here." : "Already have an account? Login here."}
                </button>
            </div>
        </div>
    )
}
