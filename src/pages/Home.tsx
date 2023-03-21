import {Button, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

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
                    <Button variant={"contained"} onClick={() => {navigate('/order')}} sx={{bgcolor: "#98c379", color: "black"}}>
                        Place an order
                    </Button>
                </Grid>
                <Grid item xs={12} md={6} justifyContent={"center"} display={"flex"} sx={{mt: 4}}>
                    <Button variant={"contained"} onClick={() => {navigate('/order-history')}} sx={{bgcolor: "#98c379", color: "black"}}>
                        View order history
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home
