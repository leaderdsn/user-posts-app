import { action, makeObservable, observable } from 'mobx';
import { AxiosResponse } from 'axios';
import { api } from '../api/api';
import { IMeta, IPagination } from '../interfaces/pagination';
import {IUser} from './UserStore';

export class UsersStore {
    @observable users: IUser[] = [];
    @observable pagination: null | IPagination = null;
    @observable isLoading = false;

    constructor() {
        makeObservable(this);
    }

    @action
     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async loadUsers(page = 1) {
        if (this.isLoading) return;

        this.isLoading = true;

        try {
            const { data: resData }: AxiosResponse<{ data: IUser[], meta: IMeta }> = await api.get(`/users?page=${page}`);
            this.users = resData.data;
            this.pagination = resData.meta.pagination;
        } catch (e) {
            console.log(e);
        }

        this.isLoading = false;
    }
}
