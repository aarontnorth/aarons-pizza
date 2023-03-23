import {fireEvent, render, screen} from '@testing-library/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import AuthContext from '../contexts/AuthContext';
import OrderContext from '../contexts/OrderContext';
import {mockOrder1234, mockOrder5678} from '../test-helpers/mockOrder';
import {Pizza} from '../types';
import SearchContext from '../contexts/SearchContext';
import userEvent from '@testing-library/user-event';

interface props {
    children: React.ReactElement;
    isAuthenticated?: boolean;
    login?: () => {};
    deleteOrder?: (orderId: string) => {};
    createOrder?: (pizza: Pizza) => {};
    search?: (searchTerm: string) => {};
    resetSearch?: () => {};
}

export const setField = (fieldName: string, newValue: string) => {
  const field = screen.getByRole('textbox', {name: fieldName});
  fireEvent.change(field, { target: { value: newValue } });
};

export const clickButton = (buttonName: string) => {
  const button = screen.getByRole('button', {name: buttonName});
  expect(button).toBeInTheDocument();
  userEvent.click(button);
};

export const mockQueryClient = new QueryClient();

export const renderWithProviders = (
  {children, isAuthenticated, login, deleteOrder, createOrder, search, resetSearch}: props
) => {
  return render(

    <QueryClientProvider client={mockQueryClient}>
      <AuthContext.Provider
        value={{
          isAuthenticated: isAuthenticated ?? false,
          login: login ?? jest.fn(),
          token: ''
        }}>
        <OrderContext.Provider
          value={{
            orders: [mockOrder1234(), mockOrder5678()],
            deleteOrder: deleteOrder ?? jest.fn(),
            createOrder: createOrder ?? jest.fn()
          }}>
          <SearchContext.Provider
            value={{
              filteredOrders: [mockOrder1234(), mockOrder5678()],
              search: search ?? jest.fn(),
              resetSearch: resetSearch ?? jest.fn()
            }}>
            {children}
          </SearchContext.Provider>
        </OrderContext.Provider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};
