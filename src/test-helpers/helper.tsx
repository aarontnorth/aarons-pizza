import {render} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from "react";
import AuthContext from "../contexts/AuthContext";

interface props {
    children: React.ReactElement;
    isAuthenticated?: boolean;
    login?: () => {};
}

export const renderWithProviders = ({children, isAuthenticated, login}: props) => {
    const queryClient = new QueryClient();
    return render(
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={{isAuthenticated: isAuthenticated ?? false, login: login ?? jest.fn(), token: ''}}>
                {children}
            </AuthContext.Provider>
        </QueryClientProvider>
    )
}
