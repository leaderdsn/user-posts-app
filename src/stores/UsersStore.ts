import {action, makeObservable, observable} from 'mobx';
import {AxiosResponse} from 'axios';
import {api} from '../api/api';

export interface IUser {
    id: number
    name: string
    gender: string
    status: string
}

export interface IMeta {
    pagination: IPagination
}

export interface IPagination {
    limit?: number
    total?: number
    pages?: number
    page?: number
}

export class UsersStore {
    @observable users: IUser[] = []
    @observable pagination?: IPagination
    @observable isLoading: boolean = false

    constructor() {
        makeObservable(this)
    }

    @action
    async loadUsers(page: number = 1) {
        if (this.isLoading) return

        this.isLoading = true

        try {
            const {data: resData}: AxiosResponse<{ data: IUser[], meta: IMeta }> = await api.get(`/users?page=${page}`)
            this.users = resData.data
            this.pagination = resData.meta.pagination
        } catch (e) {
            console.log(e)
        }

        this.isLoading = false
    }
}
