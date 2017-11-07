import { observable, hash, ObservableArray, IHash } from 'cascade';
import firebase from 'firebase';

import FireBaseCollection from '../../util/FireBaseCollection';

import { IViewModel, IMessage } from '../../interfaces/states/IViewModel';
import { IAuthState } from '../../interfaces/states/IAuthState';
import AuthState from '../../implementations/states/AuthState';

export default class ViewModel implements IViewModel {
    messageCollection: FireBaseCollection<IMessage> = new FireBaseCollection('/Messages');
    authState: IAuthState = new AuthState();
    @observable message: string = '';
    @observable value: number = 1234;
    @observable tabIndex: number = 0;
    @observable active: boolean = false;

    constructor() {
    }

    setTabIndex(tabIndex: number) {
        this.tabIndex = tabIndex;
    }

    setActive(active: boolean) {
        this.active = active;
    }

    async send() {
        try {
            await this.messageCollection.create({
                email: firebase.auth().currentUser.email,
                text: this.message,
                date: new Date(Date.now()).toUTCString()
            });
            this.message = '';
        } catch (e) {

        }
    }

    delete(data: firebase.database.DataSnapshot) {
        this.messageCollection.delete(data);
    }
}