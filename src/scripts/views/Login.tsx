import Cascade, { Component } from 'cascade';
import { Button, Form, FormActions, FormContainer, FormInput, Modal } from 'cascade-components';

import { IAuthState } from '../interfaces/states/IAuthState';

export interface ILoginProps {
    authState: IAuthState;
}

export default class Login extends Component<ILoginProps> {
    cancel = (event: Event) => {
        event.preventDefault();
        this.props.authState.loginCancel();
    }
    login = (event: Event) => {
        event.preventDefault();
        this.props.authState.login();
    }
    create = (event: Event) => {
        event.preventDefault();
        this.props.authState.createUser();
    }
    logout = (event: Event) => {
        event.preventDefault();
        this.props.authState.logout();
    }
    render() {
        let { authState } = this.props;
        return (
            <Modal open={authState.open} onclose={this.cancel} title="Login" animation="top" lockable locked={authState.loggingIn}>
                <Form>
                    <FormContainer title="Email">
                        <FormInput model={authState} modelProp="email" className="input" />
                    </FormContainer>
                    <FormContainer title="Password">
                        <FormInput model={authState} modelProp="password" type="password" className="input" />
                    </FormContainer>
                    <FormActions>
                        <Button onclick={this.cancel}>Cancel</Button>
                        <Button onclick={this.logout}>Logout</Button>
                        <Button onclick={this.login} theme="primary" disabled={authState.loggingIn}>Login</Button>
                        <Button onclick={this.create} theme="primary" disabled={authState.loggingIn}>Create User</Button>
                    </FormActions>
                </Form>
            </Modal>
        );
    }
}