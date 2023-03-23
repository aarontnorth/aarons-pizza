import { Grid, Typography} from "@mui/material";
import TextFieldWithHeader from "../components/TextFieldWithHeader";
import {Field, Form, Formik} from "formik";
import StyledButton from "../components/StyledButton";
import authContext from "../contexts/AuthContext";
import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {PageWrapper} from "../components/PageWrapper";

const Login = () => {
    const {isAuthenticated, login} = useContext(authContext);
    const navigate = useNavigate();

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
                    initialValues={{ username: '', password: '' }}
                    onSubmit={(values, actions) => {
                        login(values)
                        actions.setSubmitting(false);
                    }}
                >
                    <Form>
                        <Field component={TextFieldWithHeader} name="username" label={"username"} />
                        <Field component={TextFieldWithHeader} name="password" label={"password"} />
                        <StyledButton type="submit">Sign in</StyledButton>
                    </Form>
                </Formik>
            </Grid>
        </PageWrapper>
    )
}

export default Login
