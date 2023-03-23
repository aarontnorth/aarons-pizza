import axios from 'axios';
import {Order, Pizza} from '../types';

const baseURL = 'https://pizza-api-app.herokuapp.com/api/orders';

export async function getOrders(token: string){
  const headers = {'authorization': `Bearer ${token}`};
  return axios.get<Order[]>(baseURL, {headers: headers});
}

export function createOrderForTable(pizza: Pizza, tableNumber: number, token: string){
  const headers = {'authorization': `Bearer ${token}`};
  return axios.post(baseURL, {...pizza, Table_No: tableNumber}, {headers: headers});
}

export async function deleteOrderById(orderId: string, token: string){
  const url = `${baseURL}/${orderId}`;
  const headers = {'authorization': `Bearer ${token}`};
  return axios.delete(url,{headers: headers});
}