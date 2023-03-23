import {mockOrder} from "../test-helpers/mockOrder";
import {OrderCard} from "../components/OrderCard";
import {Grid, Typography} from "@mui/material";

const OrderHistory = () => {

    const fakeOrder = mockOrder();

    return (
        <Grid
            container
            sx={{mt: 20}}
            textAlign={"center"}
            display={"flex"}
            justifyContent={"center"}
        >
            <Typography sx={{mb: 4}} variant={"h1"}>Order History</Typography>
            <Grid item xs={6}>
                <OrderCard order={fakeOrder} />
            </Grid>
        </Grid>
    )
}

export default OrderHistory
