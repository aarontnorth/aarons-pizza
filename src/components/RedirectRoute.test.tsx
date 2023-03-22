import "@testing-library/jest-dom";
import {screen, waitFor} from "@testing-library/react";
import {RedirectRoute} from "../components/RedirectRoute";
import {renderWithProviders} from "../test-helpers/helper";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => {return <div>redirect</div>}
}));

describe("<RedirectRoute>", () => {
    it("should redirect to login if not authenticated", async () => {
        renderWithProviders({
            children: <RedirectRoute children={<div>frtlp</div>}/>,
            isAuthenticated: false
        })
        await waitFor(() => {expect(screen.getByText('redirect')).toBeInTheDocument()})
    });

    it('should render component if authenticated', () => {
        renderWithProviders({
            children: <RedirectRoute children={<div>frtlp</div>}/>,
            isAuthenticated: true
        })
        expect(screen.getByText("frtlp")).toBeInTheDocument();
    })
});