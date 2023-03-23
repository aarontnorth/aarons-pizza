import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import {OrderCard} from "./OrderCard";
import {mockOrder} from "../test-helpers/mockOrder";
import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe("<OrderCard>", () => {
    it("should render order", () => {
        render(<OrderCard order={mockOrder()} onDelete={jest.fn()}/>)
        expect(screen.getByText("Order: 1234")).toBeInTheDocument();
        expect(screen.getByText("Table number: 1")).toBeInTheDocument();
        expect(screen.getByText("Size: Medium")).toBeInTheDocument();
        expect(screen.getByText("Flavor: Cheese")).toBeInTheDocument();
        expect(screen.getByText("Crust: Regular")).toBeInTheDocument();
        expect(screen.getByText("Ordered at: 12:30")).toBeInTheDocument();
    });

    it("should delete order", () => {
        const mockDelete = jest.fn();
        render(<OrderCard order={mockOrder()} onDelete={mockDelete}/>)

        const deleteButton = screen.getByRole('button', {name: 'delete order 1234'});
        userEvent.click(deleteButton);
        expect(mockDelete).toHaveBeenCalledWith('1234');
    })
});