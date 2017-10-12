import firebase from 'firebase';

export default class Reference {
    static get(collection: string, ...args: any[]) {
        args.unshift(collection);
        return firebase.database().ref(args.join('/'));
    }
}