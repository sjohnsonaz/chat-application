import Cascade, { observable, hash, IHash } from 'cascade';
import firebase from 'firebase';

import FireBaseCollection, { TypedSnapshot } from './FireBaseCollection';

export { TypedSnapshot as TypedSnapshot };

export default class ManagedCollection<T> extends FireBaseCollection<T> {
    @observable loading: boolean = false;
    @observable creating: boolean = false;

    async create(item: T): Promise<firebase.database.Reference> {
        this.creating = true;
        try {
            var result = super.create(item);
        }
        finally {
            this.creating = false;
        }
        return result;
    }

    async start() {
        this.loading = true;
        try {
            var result = super.start();
        }
        finally {
            this.loading = false;
        }
        return result;
    }
}