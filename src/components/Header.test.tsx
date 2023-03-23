import {clickButton, renderWithProviders} from '../test-helpers/helper';
import {screen, waitFor} from '@testing-library/react';
import React from 'react';
import {Header} from '../components/Header';

describe('<Header>', () => {
  it('should show breadcrumb', async () => {
    const mockLogout = jest.fn();
    renderWithProviders({
      children : <Header path={'/home'}/>, isAuthenticated : true, logout: mockLogout
    });
    clickButton('Log out');
    await waitFor(() =>
      expect(screen.getByText('Home')).toBeInTheDocument()
    );
  });

  it('should show logout button if authenticated', async () => {
    const mockLogout = jest.fn();
    renderWithProviders({
      children : <Header path={'/home'}/>, isAuthenticated : true, logout: mockLogout
    });
    clickButton('Log out');
    await waitFor(() =>
      expect(mockLogout).toHaveBeenCalled()
    );
  });

  it('should not show logout button if unauthenticated', async () => {
    renderWithProviders({
      children : <Header path={'/home'}/>, isAuthenticated : false
    });
    expect(screen.queryByRole('button', {name: 'Log out'})).toBeNull();
  });
});