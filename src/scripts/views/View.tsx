import Cascade, { Component } from 'cascade';
import { Button, ButtonBar, Container, Form, FormInput, FormActions, FormContainer, Section, Tab, MenuBar } from 'cascade-components';

import { IViewModel } from '../interfaces/states/IViewModel';

import Login from './Login';
import Chat from './Chat';

export interface IViewProps {
    viewModel: IViewModel;
}

export default class View extends Component<IViewProps> {
    setTabIndex = (tabIndex: number) => {
        this.props.viewModel.setTabIndex(tabIndex);
    }
    setActive = (event: Event) => {
        this.props.viewModel.setActive(!this.props.viewModel.active);
    }
    send = (event: Event) => {
        event.preventDefault();
        this.props.viewModel.send();
    }
    setMessage = (event: Event) => {
        this.props.viewModel.message = (event.target as any).value;
    }
    openLoginModal = (event: Event) => {
        event.preventDefault();
        this.props.viewModel.authState.open = true;
    }
    render() {
        let { viewModel } = this.props;
        return (
            <Container menuBar>
                <MenuBar title="Chat Application" top links={[{
                    simple: true,
                    reverse: true,
                    title: <Button onclick={this.openLoginModal}>Login</Button>
                }]} />
                <Login authState={this.props.viewModel.authState} />
                <Chat viewModel={viewModel} />
            </Container>
        );
    }
}