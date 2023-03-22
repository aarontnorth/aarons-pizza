import axios from 'axios';
import {useMutation} from "@tanstack/react-query";

export interface Pizza {
    Crust: string;
    Flavor: string;
    Size: string;
    Table_No: number;
}

export function useOrderPizza() {
    return useMutation({
        mutationFn: (pizzaBody: Pizza) => {
            return axios.post(`https://pizza-api-app.herokuapp.com/api/orders`, pizzaBody);
        }
    });
}
