import React from 'react';
import {Link, Typography} from '@mui/material';
import {Breadcrumbs} from '@mui/material';
import {toSentenceCase} from '../components/OrderCard';

interface BreadcrumbProps {
    path: string;
}

export const PizzaBreadcrumbs = ({path}: BreadcrumbProps) => {
  const pages = path.split('/');
  const pagesWithoutCurrentPage = pages.slice(0,-1);
  const currentPage = pages.slice(-1)[0];

  const link = (pathSegment: string) => {
    const href = pathSegment === 'home' ? '/' : `/${pathSegment}`;
    return (
      <Link
        key={pathSegment}
        underline="always"
        color={'inherit'}
        href={href}
      >
        {toSentenceCase(pathSegment)}
      </Link>
    );
  };
  return (
    <Breadcrumbs sx={{color: 'white', mt: 2, ml: 6}}>
      {pagesWithoutCurrentPage.map(page => link(page))}
      <Typography>{toSentenceCase(currentPage)}</Typography>
    </Breadcrumbs>
  );
};