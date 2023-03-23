import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import * as fetchOrders from '../api/get-orders'
import OrderHistory from "../pages/OrderHistory";
import {mockOrder} from "../test-helpers/mockOrder";
import {renderWithProviders} from "../test-helpers/helper";

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
        expect(screen.getByText("Order History")).toBeInTheDocument();
    })
});