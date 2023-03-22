import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import Order from "./Order";
import * as orderPizzaHook from "../api/orders";
import {mockPizza} from "../test-helpers/mockPizza";
import userEvent from "@testing-library/user-event";
import {renderWithProviders} from "../test-helpers/helper";

import axios from 'axios';
jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe("<Order>", () => {

    it("should render heading", () => {
        renderWithProviders(<Order />)
        expect(screen.getByText("Order a pie!")).toBeInTheDocument();
    });

    it('should submit order', () => {
        const expectedPizza = mockPizza();
        const mockMutate = jest.fn()
        jest.spyOn(orderPizzaHook, 'useOrderPizza').mockReturnValue(
        {...jest.requireActual('../api/orders'), mutate: mockMutate}
        );
        renderWithProviders(<Order />);
        const orderButton = screen.getByRole('button', {name: 'Submit order'});
        expect(orderButton).toBeInTheDocument();
        userEvent.click(orderButton)
        expect(mockMutate).toHaveBeenCalledWith(expectedPizza);
    })
});