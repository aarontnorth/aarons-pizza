import React from 'react';
import {OrderCard} from '../components/OrderCard';
import {Grid, Typography} from '@mui/material';
import {useContext} from 'react';
import OrderContext from '../contexts/OrderContext';
import TextFieldWithError from '../components/TextFieldWithError';
import {Field, Form, Formik} from 'formik';
import StyledButton from '../components/StyledButton';
import SearchContext from '../contexts/SearchContext';

const OrderHistory = () => {
    const {deleteOrder} = useContext(OrderContext);
    const {filteredOrders, search} = useContext(SearchContext);

    const handleDelete = (orderId: string) => {
        deleteOrder(orderId);
    };

    return (
        <Grid
            container
            sx={{mt: 20}}
            textAlign={'center'}
            display={'flex'}
            justifyContent={'center'}
        >
            <Grid item xs={12}>
                <Typography sx={{mb: 4}} variant={'h1'}>Order History</Typography>
                <Typography variant={'h2'}>Filter your orders</Typography>
            </Grid>
            <Grid item xs={6}>
                <Formik
                    initialValues={{ search: '' }}
                    onSubmit={(values, actions) => {
                        search(values.search);
                        actions.setSubmitting(false);
                    }}
                >
                    <Form autoComplete={'off'}>
                        <Grid container sx={{alignItems: 'baseline'}} display={'flex'}>
                            <Grid item xs={10}>
                                <Field component={TextFieldWithError} name="search" label={'search'} />
                            </Grid>
                            <Grid item xs={2}>
                                <StyledButton type="submit">Search</StyledButton>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
                <Grid sx={{mt:6}}>
                    {filteredOrders && filteredOrders.map(order => {
                        return (<OrderCard key={order.Order_ID} order={order} onDelete={handleDelete}/>);}
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default OrderHistory;
