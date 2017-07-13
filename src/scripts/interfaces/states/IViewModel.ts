import { ObservableArray } from 'cascade';

export interface IViewModel {
    messages: ObservableArray<any>;
    message: string;
    value: number;
    tabIndex: number;
    setTabIndex(tabIndex: number): void;
    send(): void;
}