import axios from 'axios';
import {useQuery} from "@tanstack/react-query";
import {useContext} from "react";
import authContext from "../contexts/AuthContext";
import {Order} from "../types";

export function useFetchOrders() {
    const auth = useContext(authContext);
    const url = `https://pizza-api-app.herokuapp.com/api/orders`;
    const headers = {'authorization': `Bearer ${auth.token}`}
    const {data} = useQuery({
        queryKey: ['fetch-orders'],
        queryFn: () => {
            return axios.get<Order[]>(url, {headers: headers}).then(response => {
                return response.data
            });
        },
        onSuccess: () => {
            // incrementTable();
            // snack.handleSetAlert('Thank you for your order!')
        }
    });
    return data;
}
