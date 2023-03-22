import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import Order from "./Order";
import * as orderPizzaHook from "../api/orders";
import {mockPizza} from "../mockData/mockPizza";

import axios from 'axios';
import userEvent from "@testing-library/user-event";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe("<Order>", () => {
    const queryClient = new QueryClient();

    it("should render heading", () => {
        render(<Order />)
        expect(screen.getByText("Order a pie!")).toBeInTheDocument();
    });

    it('should submit order', () => {
        const expectedPizza = mockPizza();
        const mockMutate = jest.fn()
        jest.spyOn(orderPizzaHook, 'useOrderPizza').mockReturnValue(
        {...jest.requireActual('../api/orders'), mutate: mockMutate}
        );
        render(
            <QueryClientProvider client={queryClient}>
                <Order />
            </QueryClientProvider>
        )
        const orderButton = screen.getByRole('button', {name: 'Submit order'});
        expect(orderButton).toBeInTheDocument();
        userEvent.click(orderButton)
        expect(mockMutate).toHaveBeenCalledWith(expectedPizza);
    })
});