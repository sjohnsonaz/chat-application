import Cascade from 'cascade';
import firebase from 'firebase';

export default class FireBaseCollection {
    static bind(viewModel: any, key: string, collectionName: string) {
        // Load data
        let messagesRef = firebase.database().ref(collectionName);
        messagesRef.on('child_added', (data) => {
            viewModel[key][data.key] = data.val();
        });

        messagesRef.on('child_changed', (data) => {
            viewModel[key][data.key] = data.val();
        });

        messagesRef.on('child_removed', (data) => {
            delete viewModel[key][data.key];
        });
        return messagesRef;
    }
}