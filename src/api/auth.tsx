import axios from 'axios';

export interface Credentials {
    username: string;
    password: string;
}

export async function authenticateUser(credentials: Credentials){
    return axios.post(`https://pizza-api-app.herokuapp.com/api/auth`, credentials)
}
