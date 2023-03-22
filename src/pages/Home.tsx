import {Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import StyledButton from "../components/StyledButton";

const Home = () => {
    const navigate = useNavigate();

    return (
        <Grid container sx={{mt: 20}} justifyContent={"center"}>
            <Grid item xs={12} sx={{textAlign: "center"}}>
                <Typography variant={"h1"}>Hello there!</Typography>
            </Grid>
            <Grid item xs={12} sx={{textAlign: "center"}}>
                <Typography variant={"h2"}>Welcome to Aaron's Pizza</Typography>
            </Grid>
            <Grid container item xs={12} md={4} sx={{mt: 8}}>
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
        </Grid>
    )
}

export default Home
