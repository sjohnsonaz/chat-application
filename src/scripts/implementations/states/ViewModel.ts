import { observable, array, ObservableArray } from 'cascade';
import firebase from 'firebase';

import { IViewModel } from '../../interfaces/states/IViewModel';

export default class ViewModel implements IViewModel {
    @array messages: ObservableArray<any> = [] as any;
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