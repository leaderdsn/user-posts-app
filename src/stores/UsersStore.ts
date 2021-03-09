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
    pagination: IUserPagination[]
}

export interface IUserPagination {
    limit: number
    total: number
}

export class UsersStore {
    @observable users: IUser[] = []
    @observable pagination: any = []
    @observable isLoading: boolean = false

    constructor() {
        makeObservable(this)
    }

    @action
    async loadUsers (page: number = 1) {
        if (this.isLoading) return

        this.isLoading = true

        try {
            const {data: resData}: AxiosResponse<{ data: IUser[], meta:any }> = await api.get(`/users?=${page}`)
            this.users = resData.data
            console.log('resdata',resData.data)
            console.log('resdataM',resData.meta)
            console.log('resdataP',resData.meta.pagination)
            this.pagination = resData.meta.pagination
        } catch (e) {
            console.log(e)
        }

        this.isLoading = false
    }
}