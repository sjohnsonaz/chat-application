import { observable } from 'cascade';
import { IViewModel } from '../../interfaces/states/IViewModel';

export default class ViewModel implements IViewModel {
    @observable value: number = 1234;
}