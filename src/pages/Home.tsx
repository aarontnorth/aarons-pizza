import React from "react";
import {Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import StyledButton from "../components/StyledButton";
import {PageWrapper} from "../components/PageWrapper";

const Home = () => {
    const navigate = useNavigate();

    return (
        <PageWrapper heading={'Hello there!'} subheading={"Welcome to Aaron's Pizza"}>
            <Grid container item xs={6} sx={{mt: 8}}>
                <Grid item xs={12} md={6} justifyContent={"center"} display={"flex"} sx={{mt: 4}}>
                    <StyledButton onClick={() => {navigate('/order')}}>
                        Place an order
                    </StyledButton>
                </Grid>
                <Grid item xs={12} md={6} justifyContent={"center"} display={"flex"} sx={{mt: 4}}>
                    <StyledButton onClick={() => {navigate('/order-history')}} >
                        View order history
                    </StyledButton>
                </Grid>
            </Grid>
        </PageWrapper>
    )
}

export default Home
