import Cascade, { Component } from 'cascade';
import { Button, Form, FormActions, FormContainer, FormInput } from 'cascade-components';

import { IUserModel } from '../interfaces/models/IUserModel'

export interface IUserProfileProps {
    user: IUserModel;
}

export default class UserProfileProps extends Component<IUserProfileProps> {
    cancel = () => {

    }

    update = () => {

    }

    render() {
        let { user } = this.props;

        return (
            <Form>
                <FormContainer title="Display Name">
                    <FormInput model={user} modelProp="displayName" />
                </FormContainer>
            </Form>
        );
    }
}