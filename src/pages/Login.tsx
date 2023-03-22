import {Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import TextFieldWithHeader from "../components/TextFieldWithHeader";
import {Field, Form, Formik} from "formik";
import StyledButton from "../components/StyledButton";
import authContext from "../contexts/AuthContext";
import {useContext} from "react";

const Login = () => {
    const navigate = useNavigate();
    const {login} = useContext(authContext);

    return (
        <Grid container sx={{mt: 20}} justifyContent={"center"}>
            <Grid item xs={12} sx={{textAlign: "center"}}>
                <Typography variant={"h1"}>Hello there!</Typography>
            </Grid>
            <Grid item xs={12} sx={{textAlign: "center"}}>
                <Typography variant={"h2"}>Please sign in</Typography>
            </Grid>
            <Grid container item xs={4} sx={{mt: 4}} direction={"column"}>
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
        </Grid>
    )
}

export default Login
