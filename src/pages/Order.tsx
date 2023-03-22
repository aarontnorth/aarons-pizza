import {Grid, Typography} from "@mui/material";
import StyledButton from "../components/StyledButton";
import {useOrderPizza} from "../api/orders";
import useOrderSessionStorage from "../hooks/useOrderSessionStorage";

const Order = () => {
    const orderPizza = useOrderPizza();
    const {currentTable} = useOrderSessionStorage();
    const defaultPizza = {
        "Crust": "Regular",
        "Flavor": "Cheese",
        "Size": "Medium",
        "Table_No": currentTable,
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
