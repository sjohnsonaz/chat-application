import { observable, array, ObservableArray } from 'cascade';
import { IViewModel } from '../../interfaces/states/IViewModel';

export default class ViewModel implements IViewModel {
    @array messages: ObservableArray<any> = [] as any;
    @observable value: number = 1234;
    @observable tabIndex: number = 0;
    setTabIndex = (tabIndex: number) => {
        this.tabIndex = tabIndex;
    }
}