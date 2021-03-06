import Cascade, { Component } from 'cascade';
import { Button, ButtonBar, Container, Form, FormInput, FormActions, FormContainer, Section, Tab, MenuBar, MenuBarLink, MenuBarSpacer } from 'cascade-components';

import { IViewModel } from '../interfaces/states/IViewModel';

import Loading from './Loading';
import Menu from './Menu';
import Login from './Login';
import Chat from './Chat';

export interface IViewProps {
    viewModel: IViewModel;
}

export default class View extends Component<IViewProps> {
    render() {
        let { viewModel } = this.props;
        let { authState } = viewModel;
        return (
            <Container menuBarTop>
                <Menu viewModel={viewModel} />
                <Login authState={this.props.viewModel.authState} />
                {authState.loggedIn ?
                    <Chat viewModel={viewModel} /> :
                    <Loading />
                }
            </Container>
        );
    }
}