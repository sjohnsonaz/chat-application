import Cascade, { observable, hash, IHash } from 'cascade';
import firebase from 'firebase';

import Reference from './Reference';

export interface TypedSnapshot<T> extends firebase.database.DataSnapshot {
    child<U>(path: string): TypedSnapshot<U>;
    exportVal(): T;
    forEach<U>(action: (a: TypedSnapshot<U>) => boolean): boolean;
    val(): T;
}

export default class FireBaseCollection<T> {
    collectionName: string;
    ref: firebase.database.Reference;
    @hash items: IHash<TypedSnapshot<T>>;
    @observable get page(): TypedSnapshot<T>[] {
        return Object.keys(this.items).map(key => {
            return this.items[key];
        });
    }

    constructor(collectionName: string) {
        this.collectionName = collectionName;
        this.items = {};
        this.ref = this.getRef();
    }

    async create(item: T): Promise<firebase.database.Reference> {
        var newPostRef = this.ref.push();
        await newPostRef.set(item);
        return newPostRef;
    }

    async update(postRef: firebase.database.Reference | string, item: T) {
        if (typeof postRef === 'string') {
            var fixedPostRef = this.getRef(postRef);
        } else {
            fixedPostRef = postRef;
        }
        await fixedPostRef.set(item);
        return postRef;
    }

    async delete(postRef: firebase.database.Reference | firebase.database.DataSnapshot | string) {
        var fixedPostRef: firebase.database.Reference | firebase.database.DataSnapshot;
        if (typeof postRef === 'string') {
            fixedPostRef = this.getRef(postRef);
        } else {
            fixedPostRef = postRef;
        }
        return await fixedPostRef.ref.remove();
    }

    clear() {
        this.items = {};
    }

    stop() {
        this.ref.off();
    }

    async start(): Promise<{
        [index: string]: T
    }> {
        this.ref.on('child_added', (data) => {
            this.items[data.key] = data;
        });

        this.ref.on('child_changed', (data) => {
            this.items[data.key] = data;
        });

        this.ref.on('child_removed', (data) => {
            delete this.items[data.key];
        });

        let data: firebase.database.DataSnapshot = await this.ref.once('value');
        return data.val();
    }

    getRef(...args: any[]) {
        return Reference.get(this.collectionName, ...args);
    }

    async updateRef(...args: any[]) {
        this.stop();
        this.clear();
        let ref = this.getRef(...args);
        this.ref = ref;
        await this.start();
        return ref;
    }

    async remove() {
        this.stop();
        await this.ref.remove();
        this.clear();
    }
}