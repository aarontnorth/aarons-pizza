import "@testing-library/jest-dom";
import {fireEvent, screen, waitFor} from "@testing-library/react";
import Order from "./Order";
import {customPizza, mockPizza} from "../test-helpers/mockPizza";
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

    it("should render headings", () => {
        renderWithProviders({children : <Order />})
        expect(screen.getByText("Order a pie!")).toBeInTheDocument();
        expect(screen.getByText("Customize your order")).toBeInTheDocument();
    });

    it('should submit default order', async () => {
        const expectedPizza = mockPizza();
        const mockCreateOrder = jest.fn()
        renderWithProviders(
        {children : <Order />,
            createOrder: mockCreateOrder
        });

        clickOrderButton();

        await waitFor(() =>
            expect(mockCreateOrder).toHaveBeenCalledWith(expectedPizza)
        )
    })

    it("should submit custom order", async () => {
        const expectedPizza = customPizza("Thin", "Pepperoni", "XL")
        const mockCreateOrder = jest.fn()
        renderWithProviders(
            {children : <Order />,
                createOrder: mockCreateOrder
            });

        setField("crust", "Thin");
        setField("flavor", "Pepperoni");
        setField("size", "XL");

        clickOrderButton();

        await waitFor(() =>
            expect(mockCreateOrder).toHaveBeenCalledWith(expectedPizza)
        )
    })

});

const setField = (fieldName: string, newValue: string) => {
    const field = screen.getByRole('textbox', {name: fieldName});
    fireEvent.change(field, { target: { value: newValue } });
}

const clickOrderButton = () => {
    const orderButton = screen.getByRole('button', {name: 'Submit order'});
    expect(orderButton).toBeInTheDocument();
    userEvent.click(orderButton)
}