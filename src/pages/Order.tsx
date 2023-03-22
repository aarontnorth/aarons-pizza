import {Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import StyledButton from "../components/StyledButton";
import {useOrderPizza} from "../api/orders";

const Order = () => {
    const navigate = useNavigate();
    const orderPizza = useOrderPizza();
    const defaultPizza = {
        "Crust": "Regular",
        "Flavor": "Cheese",
        "Size": "Medium",
        "Table_No": 1,
    }

    const handleClick = () => {
        orderPizza.mutate(defaultPizza);
    }

    return (
        <Grid container sx={{mt: 20}} justifyContent={"center"}>
            <Grid item xs={12} sx={{textAlign: "center"}}>
                <Typography variant={"h1"}>Order a pie!</Typography>
            </Grid>
            {/*<Grid item xs={12} sx={{textAlign: "center"}}>*/}
            {/*    <Typography variant={"h2"}>Customize your order</Typography>*/}
            {/*</Grid>*/}
            <StyledButton sx={{mt: 4}} onClick={handleClick}>
                Submit order
            </StyledButton>
        </Grid>
    )
}

export default Order
