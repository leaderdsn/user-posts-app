import React from 'react';
import { UsersStore } from './UsersStore';
import { PostsStore } from './PostsStore';
import { CommentsStore } from './CommentsStore';
import {UserStore} from './UserStore';
import {PostStore} from './PostStore';

type RootStateContextValue = {
    userStore: UserStore;
    usersStore: UsersStore;
    postStore: PostStore;
    postsStore: PostsStore;
    commentsStore: CommentsStore;
}

const RootStateContext = React.createContext<RootStateContextValue>({} as RootStateContextValue);

// eslint-disable-next-line @typescript-eslint/ban-types
export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const userStore = new UserStore();
    const usersStore = new UsersStore();
    const postStore = new PostStore();
    const postsStore = new PostsStore();
    const commentsStore = new CommentsStore();

    return (
        <RootStateContext.Provider value={{ userStore, usersStore, postStore, postsStore, commentsStore }}>
            {children}
        </RootStateContext.Provider>
    );
};

export const useRootStore = () => React.useContext(RootStateContext);
