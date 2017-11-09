import Cascade, { Component } from 'cascade';
import { Button } from 'cascade-components';

import { IViewModel, IConversation } from '../../interfaces/states/IViewModel';
import { TypedSnapshop } from '../../util/FireBaseCollection';

export interface IConversationListProps {
    viewModel: IViewModel;
}

export default class ConversationList extends Component<IConversationListProps> {
    openConversation(conversation: TypedSnapshop<IConversation>, event: MouseEvent) {
        event.preventDefault();
        this.props.viewModel.openConversation(conversation);
    }

    deleteConversation(conversation: TypedSnapshop<IConversation>, event: MouseEvent) {
        event.preventDefault();
        this.props.viewModel.deleteConversation(conversation);
    }

    render() {
        let { viewModel } = this.props;
        return (
            <table className="table" style="margin-bottom: 10px;">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {viewModel.conversationCollection.page.map((item) => {
                        let conversation = item.val();
                        return (
                            <tr>
                                <td>{conversation.title}</td>
                                <td>
                                    <Button onclick={this.openConversation.bind(this, item)}>Open</Button>
                                    <Button onclick={this.deleteConversation.bind(this, item)} theme="danger">Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }
}