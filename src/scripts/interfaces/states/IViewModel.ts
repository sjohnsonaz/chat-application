import { IHash } from 'cascade';
import firebase from 'firebase';

import { IAuthState } from './IAuthState';

export interface IViewModel {
    authState: IAuthState;
    messages: IHash<firebase.database.DataSnapshot>;
    message: string;
    value: number;
    tabIndex: number;
    active: boolean;
    setTabIndex(tabIndex: number): void;
    setActive(active: boolean): void;
    send(): void;
    delete(data: firebase.database.DataSnapshot): void;
}