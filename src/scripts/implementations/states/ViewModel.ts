import { observable, hash, ObservableArray, IHash } from 'cascade';
import firebase from 'firebase';

import FireBaseCollection from '../../util/FireBaseCollection';

import { IViewModel } from '../../interfaces/states/IViewModel';
import { IAuthState } from '../../interfaces/states/IAuthState';
import AuthState from '../../implementations/states/AuthState';

export default class ViewModel implements IViewModel {
    authState: IAuthState = new AuthState();
    @hash messages: IHash<string> = {};
    @observable message: string = '';
    messagesRef: firebase.database.Reference;
    @observable value: number = 1234;
    @observable tabIndex: number = 0;
    @observable active: boolean = false;

    constructor() {
        this.messagesRef = FireBaseCollection.bind(this, 'messages', '/Messages');
    }

    setTabIndex(tabIndex: number) {
        this.tabIndex = tabIndex;
    }
    setActive(active: boolean) {
        this.active = active;
    }
    send() {
        let newPostRef = this.messagesRef.push();
        newPostRef.set(this.message).then(() => {
            this.message = '';
        });
    }
}