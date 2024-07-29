import React from 'react'
import './SignUp.css'
import userIcon from '../Assets/person.png'
import emailIcon from '../Assets/email.png'
import passwordIcon from '../Assets/password.png'
import mobileIcon from '../Assets/mobile.png'    
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const navigate = useNavigate();

    const initialFormData = {
        firstName: '',
        middleName: '',
        lastName: '',
        address: '',
        mobileNumber: '',
        emailId: '',
        password: '',
        confirmPassword: ''
    };

    const initialFormErrors = {
        firstName: '',
        lastName: '',
        address: '',
        mobileNumber: '',
        emailId: '',
        password: '',
        confirmPassword: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState(initialFormErrors);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form data:', formData)

            try {
                const response = await axios.post('https://localhost:7258/api/User/Authenticate', formData, {
                    headers: {
                        'Api_Key': 'cLjb56xsMWWK7Ug37CjlHQ=='               
                    }
                });
                if (response.ok){
                    alert("Successfully Log-in");
                    navigate('/UserHome');
                    setFormData(initialFormData);
                    setFormErrors(initialFormErrors);
                  
                }

            } catch (error) {
                console.error('Error submitting form data:', error);         
            }
        } else {
            console.error('Form has errors. Cannot submit.');
        }
    }

    const validateForm = () => {
        let valid = true;
        const newFormErrors = { ...initialFormErrors };


        if (!formData.firstName.trim()) {
            newFormErrors.firstName = 'First Name is required';
            valid = false;
        }

        if (!formData.lastName.trim()) {
            newFormErrors.lastName = 'Last Name is required';
            valid = false;
        }

        if (!formData.address.trim()) {
            newFormErrors.address = 'Address is required';
            valid = false;
        }

        if (!formData.mobileNumber.match(/^\d{10}$/)) {
            newFormErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
            valid = false;
        }

        if (!formData.emailId.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            newFormErrors.email = 'Please enter a valid email address';
            valid = false;
        }

        if (formData.password.length < 8) {
            newFormErrors.password = 'Password must be at least 8 characters long';
            valid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newFormErrors.confirmPassword = 'Passwords do not match';
            valid = false;
        }


        setFormErrors(newFormErrors);

        return valid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: '' });

        if (name === 'password' || name === 'confirmPassword') {
            if (formData.password !== formData.confirmPassword) {
                setFormErrors({
                    ...formErrors,
                    confirmPassword: 'Passwords do not match'
                });
            } else {
                setFormErrors({
                    ...formErrors,
                    confirmPassword: ''
                });
            }
        }
    };
    return (
        <div className='container'>
            <div className="header">
                <div className="text">SignUp</div>
                <div className='underline'></div>
            </div>
            <div className="inputs">
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <img src={userIcon} alt="" />
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}
                    </div>

                    <div className="input">
                        <img src={userIcon} alt="" />
                        <input
                            type="text"
                            placeholder="Middle Name"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="input">
                        <img src={userIcon} alt="" />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}
                    </div>

                    <div className="input">
                        <img src={userIcon} alt="" />
                        <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                        {formErrors.address && <span className="error">{formErrors.address}</span>}
                    </div>

                    <div className="input">
                        <img src={mobileIcon} alt="" />
                        <input
                            type="tel"
                            placeholder="Mobile Number"
                            name="mobileNumber"
                            pattern="[0-9]{10}"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required
                        />
                        {formErrors.mobileNumber && <span className="error">{formErrors.mobileNumber}</span>}
                    </div>

                    <div className="input">
                        <img src={emailIcon} alt="" />
                        <input
                            type="email"
                            placeholder="Email"
                            name="emailId"
                            value={formData.emailId}
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

                    <div className="input">
                        <img src={passwordIcon} alt="" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
                    </div>

                    <div className="submit-container">
                        <button type="submit" className="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>

    )
}
