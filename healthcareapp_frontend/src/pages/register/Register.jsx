import React, { useState } from 'react';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './register.css';
import { useHistory } from 'react-router';
import axios from 'axios';

export const Register = () => {
    const [formData, setFormData] = useState({});
    const history = useHistory();
    const handleChange = (e) => {
        console.log(e.target.name, 'name')
        console.log(e.target.value, 'value')
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const handleClick = () => {
        history.push('/login')
    }
    const handleSubmit = () => {
        console.log(formData, 'formData')
        if (!formData.name) {
            return NotificationManager.error('Please Enter a name')
        }
        if (!formData.email) {
            return NotificationManager.error('Please Enter a email')
        }
        if (!formData.password) {
            return NotificationManager.error('Please Enter a password')
        }
        if (formData.role === 'none') {
            return NotificationManager.error('Please Enter a role')
        }
        if (!formData.role) {
            return NotificationManager.error('Please Enter a role')
        }
        axios.post('http://localhost:8000/user/register', formData).then(
            user => {
                console.log(user, 'user')
                // localStorage.setItem('token', user.data.token)
                NotificationManager.success('Registered Successfully');
                setTimeout(() => {
                    history.push('/login')
                }, 2000)
            },
            err => {
                NotificationManager.error('Error message')
            }
        )
    }

    return (
        <div className="register">
            <NotificationContainer/>
            <span className="registerTitle">Register</span>
            <div className="registerForm">
                <label>Name</label>
                <input name="name" type="text" className="registerInput" onChange={handleChange} placeholder="Enter your email..." />
                <label>Email</label>
                <input name="email" type="text" className="registerInput" onChange={handleChange} placeholder="Enter your email..." />
                <label>Password</label>
                <input name="password" type="password" className="registerInput" onChange={handleChange} placeholder="Enter your password..." />
                <label>Role</label>
                <select name="role" onChange={handleChange} >
                <option value="none">none</option>
                    <option value="doctor">Doctor</option>
                    <option value="lab">laboratory technician</option>
                </select>
                <button className="registerButton" onClick={handleSubmit}>Submit</button>
            </div>
            <button className="registerLoginButton" onClick={handleClick}>Login</button>
        </div>
    )
}