import React from 'react';
import axios from 'axios';
import {useOrderPizza} from './orders';
import { renderHook, waitFor } from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {mockPizza} from "../test-helpers/mockPizza";
jest.mock('axios');

describe('Orders Api', () => {
    const queryClient = new QueryClient();

    it('should call api to create order', async () => {
        const pizzaBody = mockPizza();
        const mockHeader = {'headers': {"authorization": "Bearer "}}

        // @ts-ignore
        const wrapper = ({ children }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );

        const { result } = renderHook(() => useOrderPizza(), {wrapper});
        result.current.mutate(pizzaBody)

        await waitFor(() => result.current.isSuccess);

        expect(axios.post).toHaveBeenCalledWith(
            'https://pizza-api-app.herokuapp.com/api/orders',
            pizzaBody,
            mockHeader
        );
    });

    describe('get', () => {
        // it('returns body of response', async () => {
        //     axios.get.mockResolvedValue({ data: 'account' });
        //
        //     const result = await AccountApi.get();
        //
        //     expect(result).toBe('account');
        // });

    });
});
