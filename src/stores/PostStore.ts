import {action, makeObservable, observable} from 'mobx';
import {AxiosResponse} from 'axios';
import {api} from '../api/api';

export interface IPost {
    id: number;
    user_id: number;
    title: string;
    body: string;
    created_at: Date;
    updated_at: Date;
}

export class PostStore {
    @observable post: IPost | null = null;
    @observable isLoading = false;

    constructor() {
        makeObservable(this);
    }

    @action
     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async loadPost(postId: string) {
        this.isLoading = true;

        try {
            const {data: resData}: AxiosResponse<{ data: IPost }> = await api.get(`/posts/${postId}`);
            this.post = resData.data;
        } catch (e) {
            console.log(e);
        }

        this.isLoading = false;
    }

    @action
     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    reset () {
        this.post = null;
        this.isLoading = false;
    }
}
