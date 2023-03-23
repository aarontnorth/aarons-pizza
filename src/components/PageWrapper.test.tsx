import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {PageWrapper} from './PageWrapper';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('<PageWrapper>', () => {
  it('should render headings', () => {
    render(
      <PageWrapper heading={'mock heading'} subheading={'mock subheading'}>
        <div>hello</div>
      </PageWrapper>
    );
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('mock heading')).toBeInTheDocument();
    expect(screen.getByText('mock subheading')).toBeInTheDocument();
  });

  it('should not render subheading if none', () => {
    render(
      <PageWrapper heading={'mock heading'}>
        <div>hello</div>
      </PageWrapper>
    );
    expect(screen.queryByText('mock subheading')).not.toBeInTheDocument();
  });
});