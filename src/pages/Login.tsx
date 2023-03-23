import {Grid, Typography} from "@mui/material";
import TextFieldWithHeader from "../components/TextFieldWithHeader";
import {Field, Form, Formik} from "formik";
import StyledButton from "../components/StyledButton";
import authContext from "../contexts/AuthContext";
import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {PageWrapper} from "../components/PageWrapper";
import * as Yup from 'yup';

const Login = () => {
    const {isAuthenticated, login} = useContext(authContext);
    const navigate = useNavigate();

    const loginSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const errorText = (errorText: string) => {
        return (
            <Typography sx={{color: "red"}}>{errorText}</Typography>
        );
    }

    useEffect(() => {
        if(isAuthenticated){
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isAuthenticated])

    return (
        <PageWrapper heading={"Hello there!"} subheading={"Please sign in"}>
            <Grid item xs={4} sx={{mt: 4}}>
                <Formik
                    validationSchema={loginSchema}
                    initialValues={{ username: '', password: '' }}
                    onSubmit={(values, actions) => {
                        login(values)
                        actions.setSubmitting(false);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form autoComplete={"off"}>
                            <Field component={TextFieldWithHeader} name="username" label={"username"} />
                            {errors.username && touched.username && errorText(errors.username)}

                            <Field component={TextFieldWithHeader} name="password" label={"password"} />
                            {errors.password && touched.password && errorText(errors.password)}

                            <StyledButton type="submit" sx={{mt: 4}}>Sign in</StyledButton>
                        </Form>
                    )}
                </Formik>
            </Grid>
        </PageWrapper>
    )
}

export default Login
