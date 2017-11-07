import { observable } from 'cascade';
import firebase from 'firebase';

import { IUser } from '../../interfaces/data/IUser';
import { IUserModel } from '../../interfaces/models/IUserModel';

import Model from '../../base/implementations/Model';

export default class UserModel extends Model<IUser> implements IUserModel {
    @observable firstName: string;
    @observable lastName: string;

    @observable saving: boolean;

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