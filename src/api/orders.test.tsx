import axios from 'axios';
import { waitFor } from '@testing-library/react';
import {createOrderForTable, deleteOrderById, getOrders} from '../api/orders';
import {mockPizza} from '../test-helpers/mockPizza';

jest.mock('axios');

describe('Orders Api', () => {
  it('should call api to get orders', async () => {
    const mockHeader = {'headers': {'authorization': 'Bearer mockToken'}};

    await waitFor(() => getOrders('mockToken'));

    expect(axios.get).toHaveBeenCalledWith(
      'https://pizza-api-app.herokuapp.com/api/orders',
      mockHeader
    );
  });

  it('should call api to create order', async () => {
    const pizza = mockPizza();
    const mockHeader = {'headers': {'authorization': 'Bearer mockToken'}};

    await waitFor(() => createOrderForTable(pizza, 'mockToken'));

    expect(axios.post).toHaveBeenCalledWith(
      'https://pizza-api-app.herokuapp.com/api/orders',
      pizza,
      mockHeader
    );
  });

  it('should call api to delete order', async () => {
    const orderId = '1234';
    const mockHeader = {'headers': {'authorization': 'Bearer mockToken'}};

    await waitFor(() => deleteOrderById(orderId, 'mockToken'));

    expect(axios.delete).toHaveBeenCalledWith(
      'https://pizza-api-app.herokuapp.com/api/orders/1234',
      mockHeader
    );
  });
});
