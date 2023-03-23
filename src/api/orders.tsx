import axios from 'axios';

export async function deleteOrderById(orderId: string, token: string){
    const url = `https://pizza-api-app.herokuapp.com/api/orders/${orderId}`;
    const headers = {'authorization': `Bearer ${token}`}
    return axios.delete(url,{headers: headers})
}