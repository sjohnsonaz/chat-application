import { IHash } from 'cascade';

export interface IViewModel {
    messages: IHash<string>;
    message: string;
    value: number;
    tabIndex: number;
    setTabIndex(tabIndex: number): void;
    send(): void;
}