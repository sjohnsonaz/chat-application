import { IHash } from 'cascade';

import { IAuthState } from './IAuthState';

export interface IViewModel {
    authState: IAuthState;
    messages: IHash<string>;
    message: string;
    value: number;
    tabIndex: number;
    active: boolean;
    setTabIndex(tabIndex: number): void;
    setActive(active: boolean): void;
    send(): void;
}