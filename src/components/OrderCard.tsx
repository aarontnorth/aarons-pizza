import {Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {Order} from "../types";

interface OrderCardProps {
    order: Order;
    onDelete: (orderId: string) => void;
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

export const OrderCard = ({order, onDelete}: OrderCardProps) => {
    const size = pizzaSizesEnum[order.Size as pizzaSize];
    const flavor = toSentenceCase(order.Flavor);
    const crust = toSentenceCase(order.Crust);

    const handleClick = () => {
        onDelete(order.Order_ID);
    }

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
                        <Grid container>
                            <Grid item xs={8}>
                                <Grid container textAlign={'left'}>
                                    {pizzaDetail(`Flavor: ${flavor}`)}
                                    {pizzaDetail(`Size: ${size}`)}
                                    {pizzaDetail(`Crust: ${crust}`)}
                                    {pizzaDetail(`Table number: ${order.Table_No}`)}
                                    {pizzaDetail(`Ordered at: ${order.Timestamp}`)}
                                </Grid>
                            </Grid>
                            <Grid item xs={4} display={'flex'} justifyContent={'right'}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    sx={{height: 'fit-content'}}
                                    onClick={handleClick}
                                    aria-label={`delete order ${order.Order_ID}`}
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}