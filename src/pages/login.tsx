import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { User } from '../models/User';
import axios from 'axios';

// const loginSchema = Yup.object().shape({
//   password: Yup.string()
//     .min(8, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Required"),
//   email: Yup.string().email("Invalid email").required("Required")
// });

const LoginSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });
  
  const Login: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const [isVerificationStep, setIsVerificationStep] = useState(false);
  
    const [tempUserData, setTempUserData] = useState<User | null>(null);
  
    const handleLogin = async (values: { userName: string; password: string }) => {
      try {
        const response = await axios.post('https://ccmernapp-11a99251a1a7.herokuapp.com/api/auth/login', values);
  
        if (response.data.status === 200) {
          const { userName } = values;
          const isAdmin = userName === 'admin'; 
  
          const user: User = {
            userName: userName,
            isAdmin: isAdmin,
            token: ''
          };
  
          setTempUserData(user);
          setErrorMessage(null);
          setIsVerificationStep(true); // Move to the verification step
        } else {
          setErrorMessage(response.data.message || 'Unexpected login issue');
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setErrorMessage('Invalid username or password. Please try again.');
        } else {
          setErrorMessage('Login failed. Please try again later.');
        }
      }
    };
  
    return (
      <div className="login-container">
        <div className="login-card">
          <h2>{isVerificationStep ? 'Enter Verification Code' : 'Login'}</h2>
          
          <Formik
              initialValues={{ userName: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={handleLogin}
            >
              {() => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="userName">Username</label>
                    <Field name="userName" type="text" placeholder="Enter your username" />
                    <ErrorMessage name="userName" component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" placeholder="Enter your password" />
                    <ErrorMessage name="password" component="div" className="error-message" />
                  </div>
                  {errorMessage && <div className="error-message">{errorMessage}</div>}
                  <button type="submit" className="login-button">Login</button>
                </Form>
              )}
            </Formik>
          
          <div className="register-link">
            <p>Don’t have an account? <a href="/register">Register</a></p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;