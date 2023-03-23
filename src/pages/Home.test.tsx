import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Home from './Home';
import {clickButton} from '../test-helpers/helper';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('<Home>', () => {
  it('should render headings', () => {
    render(<Home />);
    expect(screen.getByText('Hello there!')).toBeInTheDocument();
    expect(screen.getByText('Welcome to Aaron\'s Pizza')).toBeInTheDocument();
  });

  it('should have place order button', () => {
    render(<Home />);
    clickButton('Place an order');

    expect(mockNavigate).toHaveBeenCalledWith('/order');
  });

  it('should have order history button', () => {
    render(<Home />);
    clickButton('View order history');
    expect(mockNavigate).toHaveBeenCalledWith('/order-history');
  });
});