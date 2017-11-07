import { observable } from 'cascade';
import firebase from 'firebase';

import { IData } from '../interfaces/IData';
import { IModel } from '../interfaces/IModel';

export default class Model<T extends IData> implements IModel<T> {
    ref: firebase.database.Reference;

    @observable id: string;

    constructor(value?: T) {
        if (value) {
            this.wrap(value);
        }
    }

    sync(ref: firebase.database.Reference) {
        this.ref = ref;
        this.ref.on('value', (snapshot: firebase.database.DataSnapshot) => {
            this.wrap(snapshot.val());
        });
    }

    unsync() {
        this.ref.off('value', (snapshot: firebase.database.DataSnapshot) => {
            this.wrap(snapshot.val());
        });
    }

    wrap(value: T) {
        value = value || {} as any;
        this.id = value.id;
    }

    unwrap(): T {
        return {
            id: this.id
        } as any;
    }

    clear() {
        this.wrap({} as any);
    }

    save() {
        return this.ref.update(this.unwrap());
    }

    delete() {
        return this.ref.remove();
    }
}