import axios from 'axios';
import { waitFor } from '@testing-library/react';
import {authenticateUser} from '../api/auth';
jest.mock('axios');

describe('Auth Api', () => {

  it('should call api to sign in', async () => {
    const mockAuth = {username: 'name', password: 'pass'};

    await waitFor(() => authenticateUser(mockAuth));
    expect(axios.post).toHaveBeenCalledWith('https://pizza-api-app.herokuapp.com/api/auth', mockAuth);
  });
});
