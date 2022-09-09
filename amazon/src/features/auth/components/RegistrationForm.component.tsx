import React, { FC, FormEvent, useEffect } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';

import useInput from '../../../hooks/input/use-input';
import { validateEmail } from '../../../shared/utils/validation/email';
import {
  validateNameLength,
  validatePasswordLength,
} from '../../../shared/utils/validation/length';
import { NewUser } from '../models/NewUser';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { register, reset } from '../authSlice';

const RegistrationFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    text: name,
    shouldDisplayError: nameHasError,
    textChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    clearHandler: nameClearHandler,
  } = useInput(validateNameLength);

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

  const {
    text: confirmPassword,
    shouldDisplayError: confirmPasswordHasError,
    textChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    clearHandler: confirmPasswordClearHandler,
  } = useInput(validatePasswordLength);

  const clearForm = () => {
    nameClearHandler();
    emailClearHandler();
    passwordClearHandler();
    confirmPasswordClearHandler();
  };


  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
      navigate('/signin');
    }
  }, [isSuccess, dispatch]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) return;

    if (
      nameHasError ||
      emailHasError ||
      passwordHasError ||
      confirmPasswordHasError
    )
      return;

    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    )
      return;

    const newUser: NewUser = { name, email, password };

    dispatch(register(newUser));
  };

  if (isLoading) return <CircularProgress sx={{ marginTop: '64px', color: 'primary' }} />;

  return (
    <Box sx={{ border: 1, padding: 2, borderCOlor: '#ccccc', width: '350px', marginTop: 2 }}>
      <form onSubmit={onSubmitHandler}>
        <Grid container direction="column" justifyContent="flex-start">
          <Typography variant="h4" component="h1">
            Create Account
          </Typography>
          <InputLabel sx={{ fontWeight: 700, marginTop: 1, color: '#00000' }} htmlFor="name">
            Your name
          </InputLabel>
          <TextField
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            error={nameHasError}
            helperText={nameHasError ? 'Enter your name' : ''}
            type="text"
            name="name"
            id="name"
            variant="outlined"
            size="small"
          />

          <InputLabel sx={{ fontWeight: 700, marginTop: 1, color: '#00000' }} htmlFor="email">
            Email
          </InputLabel>
          <TextField
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

          <InputLabel sx={{ fontWeight: 700, marginTop: 1, color: '#00000' }} htmlFor="repassword">
            Re-enter password
          </InputLabel>
          <TextField
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            error={confirmPassword.length > 0 && password !== confirmPassword}
            helperText={
              confirmPassword.length > 0 && password !== confirmPassword
                ? 'Passwords must match'
                : ''
            }
            type="password"
            name="repassword"
            id="repassword"
            variant="outlined"
            size="small"
          />
          <Button
            id='register-btn'
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
            Register
          </Button>
        </Grid>
      </form>
      <div style={{ marginTop: '20px' }}>
        <small>
          <span>By creating an account, you agree to Amazon's</span>
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
      <Divider sx={{ marginTop: '36px', marginBottom: '36px' }} />
      <div>
        <small>
          Already have an account?{' '}
          <Link style={{ textDecoration: 'none', color: '#0000ee' }} to="/signin">
            Sign-in
          </Link>
        </small>
      </div>
      <div>
        <small>
          Buying for work?{' '}
          <a href="#" style={{ textDecoration: 'none' }}>
            Create a free business account{' '}
          </a>
        </small>
      </div>
    </Box>
  );
};

export default RegistrationFormComponent;
