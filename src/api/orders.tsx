import axios from 'axios';
import {useMutation} from "@tanstack/react-query";
import {useContext} from "react";
import authContext from "../contexts/AuthContext";
import useOrderSessionStorage from "../hooks/useOrderSessionStorage";
import snackBarContext from "../contexts/SnackBarContext";

export interface Pizza {
    Crust: string;
    Flavor: string;
    Size: string;
    Table_No: number;
}

export function useOrderPizza() {
    const auth = useContext(authContext);
    const snack = useContext(snackBarContext)
    const {incrementTable} = useOrderSessionStorage();
    const url = `https://pizza-api-app.herokuapp.com/api/orders`;
    const headers = {'authorization': `Bearer ${auth.token}`}
    return useMutation({
        mutationFn: (pizzaBody: Pizza) => {
            return axios.post(url, pizzaBody, {headers: headers});
        },
        onSuccess: () => {
            incrementTable();
            snack.handleSetAlert('Thank you for your order!')
        }
    });
}
