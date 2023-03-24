import React from 'react';
import {createContext, useState} from 'react';
import {Alert, AlertColor, Snackbar} from '@mui/material';

const SnackBarContext = createContext({
  // eslint-disable-next-line
    handleSetAlert: (alert: string, severity?: AlertColor) => {}
});

// @ts-ignore
// eslint-disable-next-line react/prop-types
export function SnackBarProvider({ children }) {
  const [alert, setAlert] = useState<string>();
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [open, setOpen] = useState(false);

  const handleSetAlert = (alert: string, severity: AlertColor | undefined) => {
    setAlert(alert);
    setSeverity(severity ?? 'success');
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
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {alert}
        </Alert>
      </Snackbar>
      }
    </SnackBarContext.Provider>
  );
}

export default SnackBarContext;