import {action, makeObservable, observable} from 'mobx';
import {AxiosResponse} from 'axios';
import {api} from '../api/api';

export interface IComment {
    post_id: number
    name: string
    body: string
    created_at: Date
    updated_at: Date
}

export class CommentsStore {
    @observable comments: IComment[] = []
    @observable isLoading: boolean = false

    constructor() {
        makeObservable(this)
    }

    @action
    async loadComments () {
        if (this.isLoading) return

        this.isLoading = true

        try {
            const {data: resData}: AxiosResponse<{ data: IComment[] }> = await api.get('/comments')
            this.comments = resData.data
        } catch (e) {
            console.log(e)
        }

        this.isLoading = false
    }
}