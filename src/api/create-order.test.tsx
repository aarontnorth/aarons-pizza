import React from 'react';
import axios from 'axios';
import {useOrderPizza} from './create-order';
import { renderHook, waitFor } from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {mockPizza} from "../test-helpers/mockPizza";
import {screen} from "@testing-library/react";
import {SnackBarProvider} from "../contexts/SnackBarContext";

jest.mock('axios');

describe('Orders Api', () => {
    const queryClient = new QueryClient();

    it('should call api to create order', async () => {
        const pizza = mockPizza();
        const pizzaBody = {...pizza, table_no: 1}
        const mockHeader = {'headers': {"authorization": "Bearer "}}

        // @ts-ignore
        const wrapper = ({ children }) => (
            <SnackBarProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </SnackBarProvider>
        );

        const { result } = renderHook(() => useOrderPizza(), {wrapper});
        result.current.mutate(pizza)

        await waitFor(() => result.current.isSuccess);

        expect(axios.post).toHaveBeenCalledWith(
            'https://pizza-api-app.herokuapp.com/api/orders',
            pizzaBody,
            mockHeader
        );
        await waitFor(() => {
            expect(screen.getByText('Thank you for your order!')).toBeInTheDocument();
        });
    });
});
