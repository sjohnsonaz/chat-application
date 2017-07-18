import { IHash } from 'cascade';

export interface IViewModel {
    messages: IHash<string>;
    message: string;
    value: number;
    tabIndex: number;
    active: boolean;
    setTabIndex(tabIndex: number): void;
    setActive(active: boolean): void;
    send(): void;
}