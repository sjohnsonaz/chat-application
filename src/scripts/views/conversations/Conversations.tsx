import Cascade, { Component } from 'cascade';

import { IViewModel } from '../../interfaces/states/IViewModel';

import ConversationList from './ConversationList';
import ConversationForm from './ConversationForm';

export interface IConversationsProps {
    viewModel: IViewModel;
}

export default class Conversations extends Component<IConversationsProps> {
    render() {
        let { viewModel } = this.props;
        return (
            <div>
                {viewModel.conversationCollection.loading
                    ? <div class="loading">Loading</div>
                    : <ConversationList viewModel={viewModel} />}
                <ConversationForm viewModel={viewModel} />
            </div>
        );
    }
}