import React from 'react';
import '@testing-library/jest-dom';
import { render, screen} from '@testing-library/react';
import {PizzaBreadcrumbs} from '../components/PizzaBreadcrumbs';

describe('<PizzaBreadcrumbs>', () => {
  it('should render breadcrumbs with proper links', () => {
    render(<PizzaBreadcrumbs path={'home/order'}/>);
    expect(screen.getByRole('link', {name: 'Home'}));
    expect(screen.queryByRole('link', {name: 'Order'})).toBeNull();
    expect(screen.getByText('Order')).toBeInTheDocument();
  });

  it('should redirect to home page',async () => {
    render(<PizzaBreadcrumbs path={'home/order'}/>);
    const homeCrumb = screen.getByRole('link', {name: 'Home'});
    expect(homeCrumb).toHaveAttribute('href','/');
  });

  it('should redirect to breadcrumb page',async () => {
    render(<PizzaBreadcrumbs path={'home/order/frtlp'}/>);
    const homeCrumb = screen.getByRole('link', {name: 'Order'});
    expect(homeCrumb).toHaveAttribute('href','/order');
  });
});