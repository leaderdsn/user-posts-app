import { action, makeObservable, observable } from 'mobx';
import { AxiosResponse } from 'axios';
import { api } from '../api/api';
import { IMeta, IPagination } from '../interfaces/pagination';

export interface IComment {
    children: IComment;
    id: number
    post_id: number
    name: string
    body: string
    created_at: Date
    updated_at: Date
}

export class CommentsStore {
    @observable comments: IComment[] = []
    @observable pagination: null | IPagination = null
    @observable isLoading: boolean = false

    constructor() {
        makeObservable(this)
    }

    @action
    async loadComments(postId?: number) {
        if (this.isLoading) return

        this.isLoading = true

        try {
            const { data: resData }: AxiosResponse<{ data: IComment[], meta: IMeta }> = await api.get(`/posts/${postId}/comments`)
            this.comments = resData.data
            this.pagination = resData.meta.pagination
        } catch (e) {
            console.log(e)
        }

        this.isLoading = false
    }

    @action
    reset() {
        this.comments = []
        this.pagination = null
        this.isLoading = false
    }
}
