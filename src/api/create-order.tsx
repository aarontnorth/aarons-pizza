import axios from 'axios';
import {useMutation} from "@tanstack/react-query";
import {useContext} from "react";
import authContext from "../contexts/AuthContext";
import useOrderSessionStorage from "../hooks/useOrderSessionStorage";
import snackBarContext from "../contexts/SnackBarContext";
import {Pizza} from "../types";

export function useOrderPizza() {
    const auth = useContext(authContext);
    const snack = useContext(snackBarContext)
    const {currentTable, incrementTable} = useOrderSessionStorage();
    const url = `https://pizza-api-app.herokuapp.com/api/orders`;
    const headers = {'authorization': `Bearer ${auth.token}`}
    return useMutation({
        mutationFn: (pizzaBody: Pizza) => {
            return axios.post(url, {...pizzaBody, table_no: currentTable}, {headers: headers});
        },
        onSuccess: () => {
            incrementTable();
            snack.handleSetAlert('Thank you for your order!')
        }
    });
}
