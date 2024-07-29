import React from 'react'
import './Login.css'
import emailIcon from '../Assets/email.png'
import passwordIcon from '../Assets/password.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export const Login = () => {
    const navigate = useNavigate();

    const initialFormData = { 
        email: '',
        password: ''
    };

    const initialFormErrors = {
        email: '',
        password: ''
    };
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'emailId') {
            if (!value || !/\S+@\S+\.\S+/.test(value)) {
                setFormErrors({
                    ...formErrors,
                    email: 'Please enter a valid email address'
                });
            } else {
                setFormErrors({
                    ...formErrors,
                    email: ''
                });
            }
         
        }
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        try {
            const response = await axios.post('https://localhost:7258/api/User/authenticate', formData, {
                headers: {
                    'Api_Key': 'cLjb56xsMWWK7Ug37CjlHQ=='               
                }
            });
            if (response.status == 200){
                alert("Login successfully");
                navigate('/UserHome');
                setFormData(initialFormData);
                setFormErrors(initialFormErrors);
              
            }   

        } catch (error) {
            console.error('Error while login:', error);         
        }
        setFormData({
            email: '',
            password: ''
        });
    };

    const handleSignUpClick = () => {
        navigate('/SignUp');
    };
    return (

        <div className="container">
            <div className="header">
                <div className="text">Login</div>
                <div className='underline'></div>
            </div>
            <div className="inputs">
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <img src={emailIcon} alt="" />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {formErrors.email && <span className="error">{formErrors.email}</span>}
                    </div>

                    <div className="input">
                        <img src={passwordIcon} alt="" />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {formErrors.password && <span className="error">{formErrors.password}</span>}
                    </div>

                    <div className="already-account">No Account? <span onClick={handleSignUpClick}>Create One!</span>
                    </div>
                    <div className="forgot-password">Forgot password? <span>click Here!</span>
                    </div>
                    <div className="submit-container">
                    <button type="submit" className="submit">Log in</button>
                    </div>

                </form>
            </div>
        </div>
    )
}
