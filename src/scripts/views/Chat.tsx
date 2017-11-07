import Cascade, { Component } from 'cascade';
import { Button, ButtonBar, Form, FormInput, FormActions, FormContainer, Section, Tab } from 'cascade-components';
import firebase from 'firebase';

import { IViewModel, IMessage } from '../interfaces/states/IViewModel';

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
    deleteMessage = (data: firebase.database.DataSnapshot, event: Event) => {
        event.preventDefault();
        this.props.viewModel.delete(data);
    }
    render() {
        let { viewModel } = this.props;
        return (
            <Section title="Chat Application">
                <Tab
                    activeIndex={viewModel.tabIndex}
                    onSelectPanel={this.setTabIndex}
                    titles={[
                        'Messages',
                        'Tab 1',
                        'Tab 2'
                    ]} animated>
                    <div>
                        <div>
                            {viewModel.messageCollection.page.map((item) => {
                                let message: IMessage = item.val();
                                return (
                                    <div class="message">
                                        <div class="message-info">
                                            <div class="message-email">{message.email}</div>
                                            <div class="message-controls"><Button onclick={this.deleteMessage.bind(this, item)}>X</Button></div>
                                        </div>
                                        <div class="message-text">{message.text}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <Form>
                            <FormContainer title="Message">
                                <input type="text" className="input" value={viewModel.message} onkeyup={this.setMessage} />
                            </FormContainer>
                            <FormActions>
                                <Button onclick={this.send} disabled={!viewModel.message} theme="primary">Send</Button>
                            </FormActions>
                        </Form>
                    </div>
                    <div>
                        <h2>Tab 1</h2>
                        <Form>
                            <FormContainer title="Active">
                                <input type="checkbox" checked={viewModel.active} onchange={this.setActive} />
                            </FormContainer>
                        </Form>
                    </div>
                    <div>Tab 2</div>
                </Tab>
            </Section>
        );
    }
}