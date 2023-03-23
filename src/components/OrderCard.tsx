import {Card, CardContent, Grid, Typography} from "@mui/material";
import {Order} from "../types";

interface OrderCardProps {
    order: Order;
}

type pizzaSize = 'S' | 'M' | 'L' ;

enum pizzaSizesEnum {
    'S' = 'Small',
    'M' = 'Medium',
    'L' = 'Large',
}

const toSentenceCase = (text: string) => {
    return text.slice(0,1).toUpperCase() + text.slice(1).toLowerCase();
}

export const OrderCard = ({order}: OrderCardProps) => {
    const size = pizzaSizesEnum[order.Size as pizzaSize];
    const flavor = toSentenceCase(order.Flavor);
    const crust = toSentenceCase(order.Crust);

    const pizzaDetail = (detail: string) => {
        return (
            <Grid item xs={12}>
                <Typography color="text.secondary" variant={'body1'}>
                    {detail}
                </Typography>
            </Grid>
        )
    }

    return (
        <Grid container justifyContent={"left"} sx={{mb: 4}}>
            <Grid item xs={12} display={'flex'} alignItems={'left'}>
                <Typography>{`Order: ${order.Order_ID}`}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Grid container textAlign={'left'}>
                            {pizzaDetail(`Flavor: ${flavor}`)}
                            {pizzaDetail(`Size: ${size}`)}
                            {pizzaDetail(`Crust: ${crust}`)}
                            {pizzaDetail(`Table number: ${order.Table_No}`)}
                            {pizzaDetail(`Ordered at: ${order.Timestamp}`)}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}