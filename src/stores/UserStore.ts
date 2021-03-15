import {action, makeObservable, observable} from 'mobx';
import {AxiosResponse} from 'axios';
import {api} from '../api/api';

export interface IUser {
    id: number;
    name: string;
    gender: string;
    status: string;
}

export class UserStore {
    @observable user: IUser | null = null;
    @observable isLoading = false;

    constructor() {
        makeObservable(this);
    }

    @action
     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async loadUser(userId: string) {
        this.isLoading = true;

        try {
            const {data: resData}: AxiosResponse<{ data: IUser }> = await api.get(`/users/${userId}`);
            this.user = resData.data;
        } catch (e) {
            console.log(e);
        }

        this.isLoading = false;
    }

    @action
     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    reset () {
        this.user = null;
        this.isLoading = false;
    }
}
