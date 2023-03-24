import React from 'react';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import Order from './Order';
import {customPizza, mockPizza} from '../test-helpers/mockPizza';
import {clickButton, renderWithProviders, setField} from '../test-helpers/helper';

jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('<Order>', () => {

  it('should render headings', () => {
    renderWithProviders({children : <Order />});
    expect(screen.getByText('Order a pie!')).toBeInTheDocument();
    expect(screen.getByText('Customize your order')).toBeInTheDocument();
  });

  it('should submit default order', async () => {
    const expectedPizza = {...mockPizza()};
    const mockCreateOrder = jest.fn();
    renderWithProviders(
      {children : <Order />,
        createOrder: mockCreateOrder
      });

    setField('table', '1');
    clickButton('Submit order');

    await waitFor(() =>
      expect(mockCreateOrder).toHaveBeenCalledWith(expectedPizza)
    );
  });

  it('should submit custom order', async () => {
    const expectedPizza = customPizza('Thin', 'Pepperoni', 'XL', 2);
    const mockCreateOrder = jest.fn();
    renderWithProviders(
      {children : <Order />,
        createOrder: mockCreateOrder
      });

    setField('crust', 'Thin');
    setField('flavor', 'Pepperoni');
    setField('size', 'XL');
    setField('table', '2');

    clickButton('Submit order');

    await waitFor(() =>
      expect(mockCreateOrder).toHaveBeenCalledWith(expectedPizza)
    );
  });

});