import { observable, hash, ObservableArray, IHash } from 'cascade';
import firebase from 'firebase';

import { IViewModel } from '../../interfaces/states/IViewModel';

export default class ViewModel implements IViewModel {
    @hash messages: IHash<string> = {};
    @observable message: string = '';
    @observable value: number = 1234;
    @observable tabIndex: number = 0;
    @observable active: boolean = false;
    setTabIndex(tabIndex: number) {
        this.tabIndex = tabIndex;
    }
    setActive(active: boolean) {
        this.active = active;
    }
    send() {
        let messagesRef = firebase.database().ref('/Messages');
        let newPostRef = messagesRef.push();
        newPostRef.set(this.message).then(() => {
            this.message = '';
        });
    }
}