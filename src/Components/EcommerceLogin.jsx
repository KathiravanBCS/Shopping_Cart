import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Style/EcommerceLogin.css";

export const EcommerceLogin = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Validate email format
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validate username
        if (!username.trim()) {
            newErrors.username = 'Username is required';
        }

        // Validate email
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format';
        }

        // If there are errors, set them and stop submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // If no errors, proceed to the next page
        navigate('/ShoppingCart');
        };

    return (
        <div className='container'>
              <div className="Caard-Container">
            <div className="Card-header">
                <p>ECOMMERCE LOGIN</p>
            </div>
            <div className="Card-body">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="UserName"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setErrors({ ...errors, username: '' }); // Clear username error on change
                        }}
                    />
                    {errors.username && <span className="error">{errors.username}</span>}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({ ...errors, email: '' }); // Clear email error on change
                        }}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}

                    <button type="submit">SUBMIT</button>
                </form>
            </div>
        </div>
        </div>
      
    );
};