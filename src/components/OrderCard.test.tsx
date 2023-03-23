import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {OrderCard} from './OrderCard';
import {mockOrder1234} from '../test-helpers/mockOrder';
import {clickButton} from '../test-helpers/helper';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('<OrderCard>', () => {
  it('should render order', () => {
    render(<OrderCard order={mockOrder1234()} onDelete={jest.fn()}/>);
    expect(screen.getByText('Order: 1234')).toBeInTheDocument();
    expect(screen.getByText('Table number: 1')).toBeInTheDocument();
    expect(screen.getByText('Size: Medium')).toBeInTheDocument();
    expect(screen.getByText('Flavor: Cheese')).toBeInTheDocument();
    expect(screen.getByText('Crust: Regular')).toBeInTheDocument();
    expect(screen.getByText('Ordered at: 12:30')).toBeInTheDocument();
  });

  it('should delete order', () => {
    const mockDelete = jest.fn();
    render(<OrderCard order={mockOrder1234()} onDelete={mockDelete}/>);

    clickButton('delete order 1234');
    expect(mockDelete).toHaveBeenCalledWith('1234');
  });
});