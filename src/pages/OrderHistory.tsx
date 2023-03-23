import {OrderCard} from "../components/OrderCard";
import {Grid, Typography} from "@mui/material";
import {useFetchOrders} from "../api/get-orders";

const OrderHistory = () => {
    const orders = useFetchOrders();

    return (
        <Grid
            container
            sx={{mt: 20}}
            textAlign={"center"}
            display={"flex"}
            justifyContent={"center"}
        >
            <Grid item xs={12}>
                <Typography sx={{mb: 4}} variant={"h1"}>Order History</Typography>
            </Grid>
            <Grid item xs={6}>
                {orders && orders.map(order => {
                    return (<OrderCard key={order.Order_ID} order={order} onDelete={()=>{}}/>)}
                )}
            </Grid>
        </Grid>
    )
}

export default OrderHistory
