import React, {useEffect, useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useRouter} from 'next/router';
import controllers from '../api/controller';
import {FormHelperText} from '@material-ui/core';

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const firstRender = useRef(true);

  const [disable, setDisabled] = useState(true);
  const [nameError, setNameError] = useState(null);
  const [nameValue, setNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [phoneError, setPhoneError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [lastNameValue, setLastNameValue] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [passwordValue, setPasswordValue] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [emailValue, setEmailValue] = useState('');
  const [tosError, setTosError] = useState(null);
  const [tosValue, setTosValue] = useState(false);
  const [fetchErrorMsg, setFetchErrorMsg] = useState();

  //it sets the value of fields (in our case on change)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    console.log('effect in action');
    setDisabled(formValidation(false).disabled);
  }, [
    nameValue,
    phoneValue,
    emailValue,
    tosValue,
    passwordValue,
    lastNameValue]);

  const formValidation = (onSubmit) => {
    console.log('formValidation');
    setPasswordError(null);
    setEmailError(null);
    setPhoneError(null);
    setNameError(null);
    setLastNameError(null);
    setTosError(null);

    let valid = true;
    if (!phoneValue.match(
        '^(\\+{0,})(\\d{0,})([(]{1}\\d{1,3}[)]{0,}){0,}(\\s?\\d+|\\+\\d{2,3}\\s{1}\\d+|\\d+){1}[\\s|-]?\\d+([\\s|-]?\\d+){1,2}(\\s){0,}$')) {
      setPhoneError(
          'Phone number pattern is not accepted!');
      valid = false;
    }
    if (!emailValue.match(
        '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')) {
      setEmailError(
          'Email pattern is not accepted!');
      valid = false;
    }
    if (passwordValue.length < 10) {
      setPasswordError(
          'Password should be at least 10 characters long!');
      valid = false;
    }
    if (!tosValue) {
      setTosError(
          'T&C must be accepted!');
      valid = false;
    }
    if (!nameValue) {
      setNameError('First name field is required');
      valid = false;
    }
    if (!lastNameValue) {
      setLastNameError('Last name field is required');
      valid = false;
    }
    if (!phoneValue) {
      setPhoneError('Phone field is required');
      valid = false;
    }
    if (!emailValue) {
      setEmailError('Phone field is required');
      valid = false;
    }
    if (!passwordValue) {
      setPasswordError('Phone field is required');
      valid = false;
    }

    if (valid) {
      setPasswordError(null);
      setEmailError(null);
      setPhoneError(null);
      setNameError(null);
      setLastNameError(null);
      setTosError(null);
      return {disabled: false};
    } else {
      return {disabled: true};
    }
  };

  const classes = useStyles();

  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    formValidation(true);

    const emailElement = event.target.email;
    const firstNameElement = event.target.firstName;
    const lastNameElement = event.target.lastName;
    const phoneElement = event.target.phone;
    const passwordElement = event.target.password;
    const tAndCElement = event.target.tosAgreement;

    controllers.signUp(
        {
          email: emailElement.value,
          phone: phoneElement.value,
          firstName: firstNameElement.value,
          lastName: lastNameElement.value,
          password: passwordElement.value,
          tosAgreement: tAndCElement.checked,
        }).then(
        async response => {
          try {
            let res = await response.json();
            if (response.status !== 200) {
              setFetchErrorMsg(res);
            } else {
              await router.push('/');
            }
          } catch (e) {
            setFetchErrorMsg('User creation failed!');
          }
        }).catch(
        e => {
          console.log(e);
          if (e) {
            console.log(e);
            setFetchErrorMsg(e);
          } else {
            setFetchErrorMsg('User creation failed!');
          }
        },
    );
  }

  return (
      <Container onSubmit={handleSubmit} component="main" maxWidth="xs">
        <CssBaseline/>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    onChange={e => setNameValue(e.target.value)}
                    error={!!nameError}
                    helperText={nameError}
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    fullWidth
                    required
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={e => setLastNameValue(e.target.value)}
                    error={!!lastNameError}
                    helperText={lastNameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={e => setEmailValue(e.target.value)}
                    error={!!emailError}
                    helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type="tel"
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="phone"
                    onChange={e => setPhoneValue(e.target.value)}
                    error={!!phoneError}
                    helperText={phoneError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={e => setPasswordValue(e.target.value)}
                    error={!!passwordError}
                    helperText={passwordError}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox color="primary"
                                       required
                                       id="tosAgreement"
                                       value={tosValue}
                                       name="tosAgreement"
                                       onChange={e => {
                                         setTosValue(tosValue => !tosValue);
                                         console.log('changed to ',
                                             e.target.value);
                                       }}
                    />}
                    label="I accept T&C"
                />
                {tosError &&
                <FormHelperText error={true}>{tosError}</FormHelperText>}
              </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={disable}>
              Sign Up
            </Button>
            {fetchErrorMsg &&
            <FormHelperText error={true}>{fetchErrorMsg}</FormHelperText>}
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright/>
        </Box>
      </Container>
  );
}

