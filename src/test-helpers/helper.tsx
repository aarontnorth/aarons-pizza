import {render} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactElement } from "react";
import {AuthProvider} from "../contexts/AuthContext";

export const renderWithProviders = (children: ReactElement) => {
    const queryClient = new QueryClient();
    return render(
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </QueryClientProvider>
    )
}
