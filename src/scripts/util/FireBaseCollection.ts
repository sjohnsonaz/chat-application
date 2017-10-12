import Cascade, { observable, hash, IHash } from 'cascade';
import firebase from 'firebase';

import Reference from './Reference';

export default class FireBaseCollection<T> {
    collectionName: string;
    itemsRef: firebase.database.Reference;
    @hash items: IHash<firebase.database.DataSnapshot>;
    @observable get page(): firebase.database.DataSnapshot[] {
        return Object.keys(this.items).map(key => {
            return this.items[key];
        });
    }

    constructor(collectionName: string) {
        this.collectionName = collectionName;
        this.items = {};
        this.itemsRef = FireBaseCollection.bind(this, 'items', collectionName);
    }

    async create(item: T): Promise<firebase.database.Reference> {
        let newPostRef = this.itemsRef.push();
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

    getRef(...args: any[]) {
        return Reference.get(this.collectionName, ...args);
    }

    static bind(viewModel: any, key: string, collectionName: string) {
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
}