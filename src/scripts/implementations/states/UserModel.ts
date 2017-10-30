import { observable } from 'cascade';
import firebase from 'firebase';

import Model, { IModel, IData } from './Model';


export interface IUser extends IData {
    firstName: string;
    lastName: string;
}

export interface IUserModel extends IModel<IUser>, IData {

}

export default class UserModel extends Model<IUser> implements IUserModel {
    @observable firstName: string;
    @observable lastName: string;

    wrap(value: IUser) {
        super.wrap(value);
        this.firstName = value.firstName;
        this.lastName = value.lastName;
    }

    unwrap() {
        let output = super.unwrap();
        output.firstName = this.firstName;
        output.lastName = this.lastName;
        return output;
    }
}