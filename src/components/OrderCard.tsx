import {Card, CardContent, Grid, Typography} from "@mui/material";
import {Order} from "../types";

interface OrderCardProps {
    order: Order;
}

type pizzaSize = 'S' | 'M' | 'L' | 'XL';

enum pizzaSizesEnum {
    'S' = 'Small',
    'M' = 'Medium',
    'L' = 'Large',
    'XL' = 'Extra large'
}

export const OrderCard = ({order}: OrderCardProps) => {
    const getPizzaText = () => {
        const size = pizzaSizesEnum[order.Size as pizzaSize]
        const flavor = order.Flavor.toLowerCase();
        const crust = order.Crust.toLowerCase();
        return `${size} ${flavor} pizza with ${crust} crust`
    }

    return (
        <Grid container justifyContent={"left"}>
            <Grid item xs={12} display={'flex'} alignItems={'left'}>
                <Typography>{`Order: ${order.Order_ID}`}</Typography>
            </Grid>
            <Grid textAlign={'left'}>
                <Card>
                    <CardContent>
                        <Typography color="text.secondary" variant={'body1'}>
                            {getPizzaText()}
                        </Typography>
                        <Typography color="text.secondary" variant={'body2'}>
                            {`Table number: ${order.Table_No}`}
                        </Typography>
                        <Typography color="text.secondary" variant={'body2'}>
                            {`Ordered at: ${order.Timestamp}`}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}