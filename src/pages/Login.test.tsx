import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import Login from "./Login";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe("<Login>", () => {
    it("should render headings", () => {
        render(<Login />)
        expect(screen.getByText("Hello there!")).toBeInTheDocument();
        expect(screen.getByText("Please sign in")).toBeInTheDocument();
    });

    it("should render username and password fields", () => {
        render(<Login />)
        expect(screen.getByText("username")).toBeInTheDocument();
        expect(screen.getByText("password")).toBeInTheDocument();
    });


});