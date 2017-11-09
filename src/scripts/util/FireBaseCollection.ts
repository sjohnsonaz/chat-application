import Cascade, { observable, hash, IHash } from 'cascade';
import firebase from 'firebase';

import Reference from './Reference';

export interface TypedSnapshop<T> extends firebase.database.DataSnapshot {
    child<U>(path: string): TypedSnapshop<U>;
    exportVal(): T;
    forEach<U>(action: (a: TypedSnapshop<U>) => boolean): boolean;
    val(): T;
}

export default class FireBaseCollection<T> {
    collectionName: string;
    ref: firebase.database.Reference;
    @hash items: IHash<TypedSnapshop<T>>;
    @observable get page(): TypedSnapshop<T>[] {
        return Object.keys(this.items).map(key => {
            return this.items[key];
        });
    }
    @observable loading: boolean = false;
    @observable creating: boolean = false;

    constructor(collectionName: string) {
        this.collectionName = collectionName;
        this.items = {};
        this.ref = this.getRef();
    }

    async create(item: T): Promise<firebase.database.Reference> {
        this.creating = true;
        try {
            var newPostRef = this.ref.push();
            await newPostRef.set(item);
        }
        catch (e) {
            throw e;
        }
        finally {
            this.creating = false;
        }
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
        this.loading = true;
        try {
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
            var value = data.val();
        }
        catch (e) {
            throw e;
        }
        finally {
            this.loading = false;
        }
        return value;
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

    static bindCollection(viewModel: any, key: string, collectionName: string) {
        // Load data
        let itemsRef = firebase.database().ref(collectionName);
        itemsRef.on('child_added', (data) => {
            viewModel[key][data.key] = data;
        });

        itemsRef.on('child_changed', (data) => {
            viewModel[key][data.key] = data;
        });

        itemsRef.on('child_removed', (data) => {
            delete viewModel[key][data.key];
        });
        return itemsRef;
    }

    static bind(viewModel: any, collectionName: string) {
        // Load data
        let itemsRef = firebase.database().ref(collectionName);
        itemsRef.on('child_added', (data) => {
            viewModel[data.key] = data;
        });

        itemsRef.on('child_changed', (data) => {
            viewModel[data.key] = data;
        });

        itemsRef.on('child_removed', (data) => {
            delete viewModel[data.key];
        });
        return itemsRef;
    }
}