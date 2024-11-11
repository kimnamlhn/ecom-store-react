import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { User, UserRegisterInfo } from '../models/User';
import axios from 'axios';
import { Typography } from '@mui/material';
import useLocalStorage from '../hooks/useLocalStorage';
import { useUserContext } from '../contexts/UserContext';

const RegisterSchema = Yup.object().shape({
    userName: Yup.string()
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(3, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm password is required'),
    firstName: Yup.string()
        .required('First name is required'),
    lastName: Yup.string()
        .required('Last name is required'),
});

const RegisterBox: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const { loginUser } = useUserContext();

    const navigate = useNavigate();
    const [isVerifyRegisterStep, setIsVerifyRegisterStep] = useState(false);
    const [code, setCode] = useState('');

    const handleRegister = async (values: UserRegisterInfo) => {
        const { confirmPassword, ...submitValue } = values;
        try {
            const response = await axios.post('https://ccmernapp-11a99251a1a7.herokuapp.com/api/auth/register', submitValue);

            if (response.data.status === 200) {
                setIsVerifyRegisterStep(true);
                setUserName(values.userName);
                setErrorMessage(null);
            }
            else {
                setErrorMessage(response.data.message);
            }

        } catch (error) {
            setErrorMessage('Some thing went wrong');
        }
    };

    const verifyCode = async () => {
        try {
            const response = await axios.post('https://ccmernapp-11a99251a1a7.herokuapp.com/api/auth/verify', {
                userName,
                code,
            });

            if (response.status === 200) {
                const token = response.data.data.token;
                const user: User = {
                    userName: userName != null ? userName : "",
                    isAdmin: userName === "admin_account" ? true : false,
                    token: token
                };

                // setUser(user);

                loginUser(user);

                //redirect to home
                navigate("/");
            }
            else {
                setErrorMessage("Invalid code, please try again")
            }
        } catch (error) {
            setErrorMessage("Invalid code, please try again")
        }
    };

    return (
        isVerifyRegisterStep == false ? (
            <div className="register-container">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Sign up
                </Typography>
                <Formik
                    initialValues={{
                        userName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        firstName: '',
                        lastName: '',
                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={handleRegister}
                >
                    {() => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <Field name="firstName" type="text" placeholder="Enter your first name" />
                                <ErrorMessage name="firstName" component="div" className="error-message" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <Field name="lastName" type="text" placeholder="Enter your last name" />
                                <ErrorMessage name="lastName" component="div" className="error-message" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName">Username</label>
                                <Field name="userName" type="text" placeholder="Enter your username" />
                                <ErrorMessage name="userName" component="div" className="error-message" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="email" placeholder="Enter your email" />
                                <ErrorMessage name="email" component="div" className="error-message" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" placeholder="Enter your password" />
                                <ErrorMessage name="password" component="div" className="error-message" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <Field name="confirmPassword" type="password" placeholder="Confirm your password" />
                                <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                            </div>
                            <button type="submit" className="register-button">Register</button>
                        </Form>
                    )}
                </Formik>

                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        )
            :
            (
                <div className="verification-card">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Verification
                    </Typography>
                    <p> Please enter the code sent to your email to verify your account.</p>
                    <input
                        type="text"
                        placeholder="Enter verification code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="verification-input"
                    />
                    <button className="verification-button" onClick={verifyCode} >Verify</button>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
            )


    );
};

export default RegisterBox;
