import "@testing-library/jest-dom";
import {screen, waitFor} from "@testing-library/react";
import OrderHistory from "../pages/OrderHistory";
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
        renderWithProviders({children: <OrderHistory />})
        expect(screen.getByText("Order: 1234")).toBeInTheDocument();
        expect(screen.getByText("Order: 5678")).toBeInTheDocument();
    })

    it("should delete order", async () => {
        const mockDelete = jest.fn();
        renderWithProviders({children: <OrderHistory />, deleteOrder: mockDelete})
        const deleteButton = screen.getByLabelText("delete order 1234")
        userEvent.click(deleteButton);
        await waitFor(() => {
            expect(mockDelete).toHaveBeenCalledWith('1234')
        })
    })
});