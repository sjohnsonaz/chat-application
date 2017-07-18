import { observable, hash, ObservableArray, IHash } from 'cascade';
import firebase from 'firebase';

import { IViewModel } from '../../interfaces/states/IViewModel';

export default class ViewModel implements IViewModel {
    @hash messages: IHash<string> = {};
    @observable message: string = '';
    @observable value: number = 1234;
    @observable tabIndex: number = 0;
    setTabIndex(tabIndex: number) {
        this.tabIndex = tabIndex;
    }
    send() {
        let messagesRef = firebase.database().ref('/Messages');
        let newPostRef = messagesRef.push();
        newPostRef.set(this.message).then(() => {
            this.message = '';
        });
    }
}