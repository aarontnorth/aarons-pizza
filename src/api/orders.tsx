import axios from 'axios';
import {Order} from "../types";

export async function getOrders(token: string){
    const url = `https://pizza-api-app.herokuapp.com/api/orders`;
    const headers = {'authorization': `Bearer ${token}`};
    return axios.get<Order[]>(url, {headers: headers});
}

export async function deleteOrderById(orderId: string, token: string){
    const url = `https://pizza-api-app.herokuapp.com/api/orders/${orderId}`;
    const headers = {'authorization': `Bearer ${token}`}
    return axios.delete(url,{headers: headers})
}