import React from 'react';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import OrderHistory from '../pages/OrderHistory';
import {clickButton, renderWithProviders, setField} from '../test-helpers/helper';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('<OrderHistory>', () => {
  it('should render headings', () => {
    renderWithProviders({children: <OrderHistory />});
    expect(screen.getByText('Order History')).toBeInTheDocument();
    expect(screen.getByText('Filter your orders')).toBeInTheDocument();
  });

  it('should render orders', () => {
    renderWithProviders({children: <OrderHistory />});
    expect(screen.getByText('Order: 1234')).toBeInTheDocument();
    expect(screen.getByText('Order: 5678')).toBeInTheDocument();
  });

  it('should delete order', async () => {
    const mockDelete = jest.fn();
    const mockResetSearch = jest.fn();
    renderWithProviders({
      children: <OrderHistory />,
      deleteOrder: mockDelete,
      resetSearch: mockResetSearch
    });
    clickButton('delete order 1234');
    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith('1234');
      expect(mockResetSearch).toHaveBeenCalled();
    });
  });

  it('should search orders', async () => {
    const mockSearch = jest.fn();
    renderWithProviders({children: <OrderHistory />, search: mockSearch });
    setField('search','Cheese');
    clickButton('Search');
    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('Cheese');
    });
  });
});