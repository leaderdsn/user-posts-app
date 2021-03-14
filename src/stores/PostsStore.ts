import { action, makeObservable, observable } from 'mobx';
import { AxiosResponse } from 'axios';
import { api } from '../api/api';
import { IMeta, IPagination } from '../interfaces/pagination';
import { IPost } from './PostStore';

export class PostsStore {
    @observable posts: IPost[] = [];
    @observable pagination: null | IPagination = null;
    @observable isLoading: boolean = false;

    constructor() {
        makeObservable(this);
    };

    @action
    async loadPosts(page: number = 1, userId?: string) {
        if (this.isLoading) return;

        this.isLoading = true;

        try {
            const { data: resData }: AxiosResponse<{ data: IPost[], meta: IMeta }> = await api.get(`/users/${userId}/posts?page=${page}`);
            this.posts = resData.data;
            this.pagination = resData.meta.pagination;
        } catch (e) {
            console.log(e);
        };

        this.isLoading = false;
    };

    @action
    reset() {
        this.posts = [];
        this.pagination = null;
        this.isLoading = false;
    };
};
