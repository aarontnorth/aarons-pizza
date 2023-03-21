import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import Order from "./Order";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe("<Order>", () => {
    it("should render heading", () => {
        render(<Order />)
        expect(screen.getByText("Order a pie!")).toBeInTheDocument();
    });

    it('should submit order', () => {
        render(<Order />)
        const orderButton = screen.getByRole('button', {name: 'Submit order'});
        expect(orderButton).toBeInTheDocument();
    })
});