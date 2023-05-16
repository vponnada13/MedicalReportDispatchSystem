import React,{ useState } from 'react';
import './login.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useHistory } from 'react-router';
import axios from 'axios';

export const Login = () => {
    const [formData, setFormData] = useState({});
    const history = useHistory();
    const handleChange = (e) => {
        console.log(e.target.name, 'name')
        console.log(e.target.value, 'value')
        setFormData(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }
    const handleClick = () => {
        history.push('/register')
    }
    const handleSubmit = () => {
        if (!formData.email) {
            return NotificationManager.error('Please Enter a email')
        }
        if (!formData.password) {
            return NotificationManager.error('Please Enter a password')
        }
        console.log(formData, 'formData')
        axios.post('http://localhost:8000/user/login', formData).then(
            user => {
                console.log(user, 'user')
                localStorage.setItem('token', user.data.token)
                NotificationManager.success('Login Success')
                setTimeout(() => {
                    history.push('/dashboard')
                }, 2000)
            },
            err => {
                NotificationManager.error('Error')
            }
        )
    }

    return (
        <div className="login">
            <NotificationContainer/>
              <span className="loginTitle">Login</span>
            <div className="loginForm">
                <label>Email</label>
                <input name="email" type="text" className="loginInput" onChange={handleChange} placeholder="Enter your email..." />
                <label>Password</label>
                <input name="password" type="password" className="loginInput" onChange={handleChange} placeholder="Enter your password..." />
                <button className="loginButton" onClick={handleSubmit}>Submit</button>
            </div>
            <button className="loginRegisterButton" onClick={handleClick}>Register</button>
        </div>
    )
}