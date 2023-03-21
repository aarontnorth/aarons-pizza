import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import Home from "./Home";
import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe("<Home>", () => {
    it("should render headings", () => {
        render(<Home />)
        expect(screen.getByText("Hello there!")).toBeInTheDocument();
        expect(screen.getByText("Welcome to Aaron's Pizza")).toBeInTheDocument();
    });

    it('should have place order button', () => {
        render(<Home />)
        const orderButton = screen.getByRole('button', {name: 'Place an order'})
        expect(orderButton).toBeInTheDocument();
        userEvent.click(orderButton);
        expect(mockNavigate).toHaveBeenCalledWith('/order')
    })

    it('should have order history button', () => {
        render(<Home />)
        const orderHistoryButton = screen.getByRole('button', {name: 'View order history'})
        expect(orderHistoryButton).toBeInTheDocument();
        userEvent.click(orderHistoryButton);
        expect(mockNavigate).toHaveBeenCalledWith('/order-history')
    })
});