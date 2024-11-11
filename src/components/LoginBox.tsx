import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { User } from '../models/User';
import axios from 'axios';
import { Link, Typography } from '@mui/material';
import ForgotPassword from './ForgotPassword';
import { useUserContext } from '../contexts/UserContext';

const LoginSchema = Yup.object().shape({
  userName: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const LoginBox: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const { loginUser } = useUserContext();

  const navigate = useNavigate();
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async (values: { userName: string; password: string }) => {
    try {
      const response = await axios.post('https://ccmernapp-11a99251a1a7.herokuapp.com/api/auth/login', values);

      if (response.data.status === 200) {
        const { userName } = values;

        setUserName(userName);
        setIsVerificationStep(true);
      } else {
        setErrorMessage(response.data.message || 'Unexpected login issue');
      }
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.');
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
    isVerificationStep == false ? (
      <div>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Sign in
        </Typography>
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
              <button type="submit" className="login-button">Login</button>
            </Form>
          )}
        </Formik>
        <ForgotPassword open={open} handleClose={handleClose} />
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <Link
            href="/register/"
            variant="body2"
            sx={{ alignSelf: 'center' }}
          >
            Sign up
          </Link>
        </Typography>

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

export default LoginBox;
