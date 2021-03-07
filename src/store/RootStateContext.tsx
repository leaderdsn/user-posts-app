import React from 'react';
import UsersStore from './UsersStore';

type RootStateContextValue = {
    usersStore: UsersStore
}

const RootStateContext = React.createContext<RootStateContextValue>({} as RootStateContextValue);

const usersStore = new UsersStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    return (
        <RootStateContext.Provider value={{ usersStore }}>
            {children}
        </RootStateContext.Provider>
    );
};

export const useRootStore = () => React.useContext(RootStateContext)