import React from 'react';
import axios from 'axios';
import { renderHook, waitFor } from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useLogin} from "./auth";
jest.mock('axios');

describe('Auth Api', () => {
    const queryClient = new QueryClient();

    it('should call api to sign in', async () => {
        const mockAuth = {username: 'name', password: 'pass'};

        // @ts-ignore
        const wrapper = ({ children }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );

        const { result } = renderHook(() => useLogin(), {wrapper});
        result.current.mutate(mockAuth)

        await waitFor(() => result.current.isSuccess);

        expect(axios.post).toHaveBeenCalledWith('https://pizza-api-app.herokuapp.com/api/auth', mockAuth);
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
