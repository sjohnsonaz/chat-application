import { IData } from '../../base/interfaces/IData';
import { IModel } from '../../base/interfaces/IModel';

import { IUser } from '../data/IUser';

export interface IUserModel extends IModel<IUser>, IData {

}