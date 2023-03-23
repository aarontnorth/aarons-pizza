import {render} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from "react";
import AuthContext from "../contexts/AuthContext";
import OrderContext from "../contexts/OrderContext";
import {mockOrder1234, mockOrder5678} from "../test-helpers/mockOrder";

interface props {
    children: React.ReactElement;
    isAuthenticated?: boolean;
    login?: () => {};
    deleteOrder?: (orderId: string) => {};
}

export const mockQueryClient = new QueryClient();

export const renderWithProviders = ({children, isAuthenticated, login, deleteOrder}: props) => {
    return render(

        <QueryClientProvider client={mockQueryClient}>
            <AuthContext.Provider value={{isAuthenticated: isAuthenticated ?? false, login: login ?? jest.fn(), token: ''}}>
                <OrderContext.Provider value={{ orders: [mockOrder1234(), mockOrder5678()], deleteOrder: deleteOrder ?? jest.fn()}}>
                    {children}
                </OrderContext.Provider>
            </AuthContext.Provider>
        </QueryClientProvider>
    )
}
