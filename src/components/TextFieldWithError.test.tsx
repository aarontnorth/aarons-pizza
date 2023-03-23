import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import TextFieldWithError from '../components/TextFieldWithError';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('<TextFieldWithError>', () => {
    it('should render heading', () => {
        render(<TextFieldWithError label={'mock label'} hasError={false}/>);
        expect(screen.getAllByText('mock label')).toBeDefined();
    });

    it('should not render error if hasError is false', () => {
        render(<TextFieldWithError label={'mock label'} hasError={false} errorText={'no error'}/>);
        expect(screen.queryByText('no error')).toBeNull();
    });

    it('should render error', () => {
        render(<TextFieldWithError label={'mock label'} hasError={true} errorText={'error!'}/>);
        expect(screen.getByText('error!')).toBeInTheDocument();
    });
});