import "@testing-library/jest-dom";
import {screen, waitFor} from "@testing-library/react";
import * as fetchOrders from '../api/get-orders'
import OrderHistory from "../pages/OrderHistory";
import {mockOrder} from "../test-helpers/mockOrder";
import {renderWithProviders} from "../test-helpers/helper";
import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe("<OrderHistory>", () => {
    it("should render headings", () => {
        renderWithProviders({children: <OrderHistory />})
        expect(screen.getByText("Order History")).toBeInTheDocument();
    });

    it("should render orders", () => {
        jest.spyOn(fetchOrders, 'useFetchOrders')
            .mockReturnValue([mockOrder(), {...mockOrder(), Order_ID: '4567'}])

        renderWithProviders({children: <OrderHistory />})
        expect(screen.getByText("Order: 1234")).toBeInTheDocument();
        expect(screen.getByText("Order: 4567")).toBeInTheDocument();
    })

    it("should delete order", async () => {
        const mockDelete = jest.fn();
        jest.spyOn(fetchOrders, 'useFetchOrders')
            .mockReturnValue([mockOrder(), {...mockOrder(), Order_ID: '4567'}])
        renderWithProviders({children: <OrderHistory />, deleteOrder: mockDelete})
        const deleteButton = screen.getByLabelText("delete order 1234")
        userEvent.click(deleteButton);
        await waitFor(() => {
            expect(mockDelete).toHaveBeenCalledWith('1234')
        })
    })
});