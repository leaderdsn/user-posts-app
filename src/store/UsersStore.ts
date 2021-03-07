import { observable, action } from 'mobx';
import { getUsers } from '../api/api';

// interface iUser {
//     code?: number,
//     data: Array<string>,
//     meta?: Array<string>
// }
interface iUser {
    code?: number,
    data: string[],
    meta?: string[]
}

export default class UsersStore {

    // @observable users: Array<iUser> = []
    @observable users: Array<string> = []

    @action
    loadUsers = () => {
        getUsers().then(users => this.users = users)
    }
}