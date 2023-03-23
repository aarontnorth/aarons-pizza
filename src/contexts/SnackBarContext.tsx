import React from 'react';
import {createContext, useState} from 'react';
import {Alert, Snackbar} from '@mui/material';

const SnackBarContext = createContext({
  // eslint-disable-next-line
    handleSetAlert: (alert: string) => {}
});

// @ts-ignore
// eslint-disable-next-line react/prop-types
export function SnackBarProvider({ children }) {
  const [alert, setAlert] = useState<string>();
  const [open, setOpen] = useState(false);

  const handleSetAlert = (alert: string) => {
    setAlert(alert);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackBarContext.Provider value={{ handleSetAlert }}>
      {children}
      {<Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
        open={open}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {alert}
        </Alert>
      </Snackbar>
      }
    </SnackBarContext.Provider>
  );
}

export default SnackBarContext;