import "@testing-library/jest-dom";
import {fireEvent, screen, waitFor} from "@testing-library/react";
import Login from "./Login";
import userEvent from "@testing-library/user-event";
import {renderWithProviders} from "../test-helpers/helper";
jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe("<Login>", () => {
    it("should render headings", () => {
        renderWithProviders({children : <Login />})
        expect(screen.getByText("Hello there!")).toBeInTheDocument();
        expect(screen.getByText("Please sign in")).toBeInTheDocument();
    });

    it("should submit login request", async () => {
        const expectedCredentials = {username: "user", password: "pass"};
        const mockLogin = jest.fn();
        await renderWithProviders({children : <Login />, login: mockLogin});
        const username = screen.getByRole('textbox', {name: 'username'});
        fireEvent.change(username, { target: { value: 'user' } });
        const password = screen.getByRole('textbox', {name: 'password'});
        fireEvent.change(password, { target: { value: 'pass' } });
        const signinButton = await screen.findByRole('button', {name: 'Sign in'});
        expect(signinButton).toBeInTheDocument();
        userEvent.click(signinButton)
        await waitFor(() =>
            expect(mockLogin).toHaveBeenCalledWith(expectedCredentials)
        )
    })

    it('should redirect to home if authenticated', async () => {
        renderWithProviders({children : <Login/>, isAuthenticated : true})
        expect(mockNavigate).toHaveBeenCalledWith('/')
    })
});