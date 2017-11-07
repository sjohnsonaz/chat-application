import Cascade, { Component } from 'cascade';
import { Button, ButtonBar, Form, FormInput, FormActions, FormContainer, Section, Tab } from 'cascade-components';
import firebase from 'firebase';

import { IViewModel, IMessage } from '../interfaces/states/IViewModel';

import Conversations from './Conversations';
import Messages from './Messages';

export interface IChatProps {
    viewModel: IViewModel;
}

export default class Chat extends Component<IChatProps> {
    setTabIndex = (tabIndex: number) => {
        this.props.viewModel.setTabIndex(tabIndex);
    }
    setActive = (event: Event) => {
        this.props.viewModel.setActive(!this.props.viewModel.active);
    }
    openLoginModal = (event: Event) => {
        event.preventDefault();
        this.props.viewModel.authState.open = true;
    }
    render() {
        let { viewModel } = this.props;
        return (
            <Section title="Chat Application">
                <Tab
                    activeIndex={viewModel.tabIndex}
                    onSelectPanel={this.setTabIndex}
                    titles={[
                        'Conversations',
                        'Messages',
                        'Tab 2'
                    ]} animated>
                    <Conversations viewModel={viewModel} />
                    <Messages viewModel={viewModel} />
                    <div>Tab 2</div>
                </Tab>
            </Section>
        );
    }
}