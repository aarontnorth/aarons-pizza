import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import TextFieldWithHeader from "../components/TextFieldWithHeader";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe("<TextFieldWithHeader>", () => {
    it("should render heading", () => {
        render(<TextFieldWithHeader label={"mock label"}/>)
        expect(screen.getAllByText("mock label")).toBeDefined()
    });
});