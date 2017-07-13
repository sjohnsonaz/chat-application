import { ObservableArray } from 'cascade';

export interface IViewModel {
    messages: ObservableArray<any>;
    value: number;
    tabIndex: number;
    setTabIndex(tabIndex: number): void;
}