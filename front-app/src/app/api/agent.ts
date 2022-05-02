import axios, { AxiosResponse } from 'axios';
import { Note } from '../models/note';
import { UserFormValues } from '../models/user';
import { User } from '../models/user';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(function (config: any) {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Notes = {
    list: () => requests.get<Note[]>('/notes'),
    details: (id: string) => requests.get<Note>('/notes/' + id),
    create: (note: Note) => requests.post<void>('/notes', note),
    update: (note: Note) => requests.put<void>('/notes/' + note.id, note),
    delete: (id: string) => requests.delete<void>('/notes/' + id),
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
}

const agent = {
    Notes,
    Account
}

export default agent;