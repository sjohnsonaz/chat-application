import Cascade, { Component } from 'cascade';
import { Button } from 'cascade-components';
import firebase from 'firebase';

import { IViewModel, IMessage } from '../../interfaces/states/IViewModel';

export interface IMessageListProps {
    viewModel: IViewModel;
}

export default class MessageList extends Component<IMessageListProps> {
    deleteMessage = (data: firebase.database.DataSnapshot, event: Event) => {
        event.preventDefault();
        this.props.viewModel.delete(data);
    }
    render() {
        let { viewModel } = this.props;
        return (
            <div>
                {viewModel.conversationMessagesCollection.page.map((item) => {
                    let message = item.val();
                    return (
                        <div class="message" key={item.key}>
                            <div class="message-info">
                                <div class="message-email">{message.email}</div>
                                <div class="message-controls"><Button onclick={this.deleteMessage.bind(this, item)}>X</Button></div>
                            </div>
                            <div class="message-text">{message.text}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}