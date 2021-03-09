import {action, makeObservable, observable} from 'mobx';
import {AxiosResponse} from 'axios';
import {api} from '../api/api';

export interface IPost {
    user_id: number
    title: string
    created_at: Date
    updated_at: Date
}

export class PostsStore {
    @observable posts: IPost[] = []
    @observable isLoading: boolean = false

    constructor() {
        makeObservable(this)
    }

    @action
    async loadPosts () {
        if (this.isLoading) return

        this.isLoading = true

        try {
            const {data: resData}: AxiosResponse<{ data: IPost[] }> = await api.get('/posts')
            this.posts = resData.data
        } catch (e) {
            console.log(e)
        }

        this.isLoading = false
    }
}