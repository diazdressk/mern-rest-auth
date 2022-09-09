import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useInput from '../../../hooks/input/use-input';
import { validateEmail } from '../../../shared/utils/validation/email';
import {
  validateNameLength,
  validatePasswordLength,
} from '../../../shared/utils/validation/length';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { login, reset } from '../authSlice';
import { LoginUser } from '../models/LoginUser.interface';

const SigninFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
  } = useInput(validateEmail);

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
  } = useInput(validatePasswordLength);

  const clearForm = () => {
    emailClearHandler();
    passwordClearHandler();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
    }
  }, [isSuccess, dispatch]);
  // console.log(isAuthenticated, 'signIn');

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate('/');
  }, [isAuthenticated]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailHasError || passwordHasError) return;

    if (email.length === 0 || password.length === 0) return;

    const loginUser: LoginUser = { email, password };

    dispatch(login(loginUser));
  };

  if (isLoading) return <CircularProgress sx={{ marginTop: '64px', color: 'primary' }} />;

  return (
    <>
      <Box sx={{ border: 1, padding: 2, borderCOlor: '#ccccc', width: '350px', marginTop: 2 }}>
        <form onSubmit={onSubmitHandler}>
          <Grid container direction="column" justifyContent="flex-start">
            <Typography
              variant="h4"
              component="h1" /* вообще h4,но указал как h1,для сео, типа, заголовк нужен */
            >
              Sign-In
            </Typography>
            <InputLabel sx={{ fontWeight: 700, marginTop: 1, color: '#00000' }} htmlFor="email">
              Emaila
            </InputLabel>
            <TextField
              // sx={{
              //   '&:active': {
              //     boxShadow: '0 0 3px 2px rgb(228 121 17 / 50%)',
              //     borderColor: '#150e6d',
              //   },
              // }}
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              error={emailHasError}
              helperText={emailHasError ? 'Enter your email' : ''}
              type="email"
              name="email"
              id="email"
              variant="outlined"
              size="small"
            />

            <InputLabel sx={{ fontWeight: 700, marginTop: 1, color: '#00000' }} htmlFor="password">
              Password
            </InputLabel>
            <TextField
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordHasError}
              helperText={passwordHasError ? 'Minimum 6 characters required' : ''}
              type="password"
              placeholder="Minimum 6 characters required"
              name="password"
              id="password"
              variant="outlined"
              size="small"
            />

            <Button
              id="signin-btn"
              disabled={!validatePasswordLength(password) || !validateEmail(email)}
              variant="contained"
              style={{
                height: '31px',
                marginTop: '15px',
                borderColor: '#a88734 #9c7e31 #cec7b7',
                backgroundColor: '#f0c14b',
                color: 'black',
                textTransform: 'none',
              }}
              type="submit">
              Sign-In
            </Button>
          </Grid>
        </form>
        <div style={{ marginTop: '20px' }}>
          <small>
            <span>By continuing, you agree to Amazon's</span>
          </small>
        </div>
        <div>
          <small>
            <a href="#" style={{ textDecoration: 'none' }}>
              Conditions of use{' '}
            </a>
            and
            <a href="#" style={{ textDecoration: 'none' }}>
              {' '}
              Privacy Policy
            </a>
          </small>
        </div>
      </Box>
      <div style={{ marginTop: '16px' }}>
        <Divider>
          <small style={{ color: '#767676' }}>New to Amazon?</small>
        </Divider>
        <Link
          id="register-link"
          style={{ textDecoration: 'none', color: '#0000ee' }}
          to="/register">
          <Button
            variant="contained"
            style={{
              width: '100%',
              height: '31px',
              marginTop: '12px',
              backgroundColor: '#f1f1f1',
              color: 'black',
              textTransform: 'none',
            }}>
            Register
          </Button>
        </Link>
      </div>
    </>
  );
};

export default SigninFormComponent;
