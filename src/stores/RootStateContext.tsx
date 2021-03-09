import React from 'react';
import {UsersStore} from './UsersStore';
import {PostsStore} from './PostStore';
import {CommentsStore} from './CommentsStore';

type RootStateContextValue = {
    usersStore: UsersStore
    postsStore: PostsStore
    commentsStore: CommentsStore
}

const RootStateContext = React.createContext<RootStateContextValue>({} as RootStateContextValue);

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    const usersStore = new UsersStore();
    const postsStore = new PostsStore();
    const commentsStore = new CommentsStore();

    return (
        <RootStateContext.Provider value={{ usersStore, postsStore, commentsStore }}>
            {children}
        </RootStateContext.Provider>
    );
};

export const useRootStore = () => React.useContext(RootStateContext)