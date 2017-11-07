import firebase from 'firebase';

import { IData } from './IData';

export interface IModel<T extends IData> {
    ref: firebase.database.Reference;

    id: string;
}