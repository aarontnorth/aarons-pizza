import {createContext, useState} from "react";
import { Snackbar } from "@mui/material";

const SnackBarContext = createContext({
    handleSetAlert: (alert: string) => {}
})

// @ts-ignore
export function SnackBarProvider({ children }) {
    const [alert, setAlert] = useState<string>()
    const [open, setOpen] = useState(false);

    const handleSetAlert = (alert: string) => {
        setAlert(alert)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setAlert('');
    }

    // const closeButton = () => {
    //     return (
    //         <IconButton
    //             size="small"
    //             aria-label="close"
    //             color="inherit"
    //             onClick={handleClose}
    //         >
    //             <CloseIcon fontSize="small" />
    //         </IconButton>
    //     )
    // }

    return (
        <SnackBarContext.Provider value={{ handleSetAlert }}>
            {children}
            {<Snackbar onClose={handleClose} open={open} message={alert} />}
        </SnackBarContext.Provider>
    )
}

export default SnackBarContext