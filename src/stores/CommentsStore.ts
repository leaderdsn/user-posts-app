import {action, makeObservable, observable} from 'mobx';
import {AxiosResponse} from 'axios';
import {api} from '../api/api';

export interface IComment {
    id: number
    post_id: number
    name: string
    body: string
    created_at: Date
    updated_at: Date
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
export class CommentsStore {
    @observable comments: IComment[] = []
    @observable pagination?: IPagination
    @observable isLoading: boolean = false

    constructor() {
        makeObservable(this)
    }

    @action
    async loadComments (page: number = 1, postId?:number) {
        if (this.isLoading) return

        this.isLoading = true

        try {
            const {data: resData}: AxiosResponse<{ data: IComment[], meta: IMeta }> = await api.get(`/posts/${postId}/comments?page=${page}`)
            this.comments = resData.data
            this.pagination = resData.meta.pagination
        } catch (e) {
            console.log(e)
        }

        this.isLoading = false
    }
}