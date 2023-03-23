import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderHistory from "../pages/OrderHistory";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe("<OrderHistory>", () => {
    it("should render headings", () => {
        render(<OrderHistory />)
        expect(screen.getByText("Order History")).toBeInTheDocument();
    });
});