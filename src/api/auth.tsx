import axios from 'axios';
import {useMutation} from "@tanstack/react-query";

export interface AuthInfo {
    username: string;
    password: string;
}

export function useLogin() {
    return useMutation({
        mutationFn: (auth: AuthInfo) => {
            return axios.post(`https://pizza-api-app.herokuapp.com/api/auth`, auth);
        }
    });
}
