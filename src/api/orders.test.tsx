import React from 'react';
import axios from 'axios';
import { waitFor } from "@testing-library/react";
import {deleteOrderById} from "../api/orders";

jest.mock('axios');

describe('Orders Api', () => {

    it('should call api to delete order', async () => {
        const orderId = '1234';
        const mockHeader = {'headers': {"authorization": "Bearer mockToken"}}

        await waitFor(() => deleteOrderById(orderId, 'mockToken'));

        expect(axios.delete).toHaveBeenCalledWith(
            'https://pizza-api-app.herokuapp.com/api/orders/1234',
            mockHeader
        );
    });
});
