import React from 'react';
import axios from 'axios';
import { renderHook, waitFor } from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SnackBarProvider} from "../contexts/SnackBarContext";
import {useFetchOrders} from "../api/get-orders";
import {mockOrder} from "../test-helpers/mockOrder";

describe('Orders Api', () => {
    const queryClient = new QueryClient();

    it('should call api to fetch orders', async () => {
        const mockHeader = {'headers': {"authorization": "Bearer "}}
        const expectedOrders = [mockOrder()]

        const MockAdapter = require("axios-mock-adapter");
        const mock = new MockAdapter(axios);

        mock.onGet("https://pizza-api-app.herokuapp.com/api/orders")
            .reply(200, expectedOrders);

        // @ts-ignore

        const wrapper = ({ children }) => (
            <SnackBarProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </SnackBarProvider>
        );
        const { result } = renderHook(() => useFetchOrders(), {wrapper});

        expect(axios.get).toHaveBeenCalledWith(
            'https://pizza-api-app.herokuapp.com/api/orders',
            mockHeader
        );
        expect(result.current).toEqual(expectedOrders)
    });

});
