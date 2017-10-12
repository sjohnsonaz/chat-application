import { IHash } from 'cascade';
import firebase from 'firebase';

import FireBaseCollection from '../../util/FireBaseCollection';

import { IAuthState } from './IAuthState';

export interface IViewModel {
    authState: IAuthState;
    messageCollection: FireBaseCollection<string>;
    message: string;
    value: number;
    tabIndex: number;
    active: boolean;
    setTabIndex(tabIndex: number): void;
    setActive(active: boolean): void;
    send(): void;
    delete(data: firebase.database.DataSnapshot): void;
}