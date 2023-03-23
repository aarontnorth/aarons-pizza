import React, {useContext} from 'react';
import {Grid} from '@mui/material';
import {PizzaBreadcrumbs} from '../components/PizzaBreadcrumbs';
import StyledButton from '../components/StyledButton';
import authContext from '../contexts/AuthContext';

interface HeaderProps {
    path: string;
}

export const Header = ({path}: HeaderProps) => {
  const {isAuthenticated, logout} = useContext(authContext);
  return (
    <Grid container>
      <Grid item xs={6} display={'flex'} justifyContent={'left'}>
        <PizzaBreadcrumbs path={path} />
      </Grid>
      {isAuthenticated &&
        <Grid item xs={6} display={'flex'} justifyContent={'right'}>
          <StyledButton onClick={logout} sx={{mt: 2, mr: 6}}>Log out</StyledButton>
        </Grid>
      }
    </Grid>
  );
};