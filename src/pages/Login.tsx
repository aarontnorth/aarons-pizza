import React, {useEffect} from 'react';
import {Grid} from '@mui/material';
import TextFieldWithError from '../components/TextFieldWithError';
import {Field, Form, Formik} from 'formik';
import StyledButton from '../components/StyledButton';
import authContext from '../contexts/AuthContext';
import {useContext} from 'react';
import {PageWrapper} from '../components/PageWrapper';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const {isAuthenticated, login, logout} = useContext(authContext);
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  useEffect(() => {
    if(isAuthenticated){
      navigate('/');
    }
    // eslint-disable-next-line
  },[isAuthenticated])

  const Logout = () => {
    return (
      <PageWrapper heading={'Hello there!'} subheading={'Would you like to log out?'}>
        <StyledButton onClick={logout} sx={{mt: 4}}>Log out</StyledButton>
      </PageWrapper>
    );
  };

  const Login = () => (
    <PageWrapper heading={'Hello there!'} subheading={'Please sign in'}>
      <Grid item xs={4} sx={{mt: 4}}>
        <Formik
          validationSchema={loginSchema}
          initialValues={{ username: '', password: '' }}
          onSubmit={(values, actions) => {
            login(values);
            actions.setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form autoComplete={'off'}>
              <Field
                component={TextFieldWithError}
                name="username"
                label={'username'}
                hasError={errors.username && touched.username}
                errorText={errors.username}
              />
              <Field
                component={TextFieldWithError}
                name="password"
                label={'password'}
                hasError={errors.password && touched.password}
                errorText={errors.password}
              />
              <StyledButton type="submit" sx={{mt: 4}}>Sign in</StyledButton>
            </Form>
          )}
        </Formik>
      </Grid>
    </PageWrapper>
  );

  return (isAuthenticated ? <Logout /> : <Login />);
};

export default Login;
