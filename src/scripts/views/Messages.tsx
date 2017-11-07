import Cascade, { Component } from 'cascade';
import { Button, Form, FormInput, FormActions, FormContainer } from 'cascade-components';
import firebase from 'firebase';

import { IViewModel, IMessage } from '../interfaces/states/IViewModel';

import MessageList from './MessageList';

export interface IMessagesProps {
    viewModel: IViewModel;
}

export default class Messages extends Component<IMessagesProps> {
    setMessage = (event: Event) => {
        this.props.viewModel.message = (event.target as any).value;
    }
    deleteMessage = (data: firebase.database.DataSnapshot, event: Event) => {
        event.preventDefault();
        this.props.viewModel.delete(data);
    }
    sendMessage = (event: Event) => {
        event.preventDefault();
        this.props.viewModel.sendMessage();
    }
    render() {
        let { viewModel } = this.props;
        return (
            <div>
                <MessageList viewModel={viewModel} />
                <Form>
                    <FormContainer title="Message">
                        <input type="text" className="input" value={viewModel.message} onkeyup={this.setMessage} />
                    </FormContainer>
                    <FormActions>
                        <Button onclick={this.sendMessage} disabled={!viewModel.message} theme="primary">Send</Button>
                    </FormActions>
                </Form>
            </div>
        );
    }
}