import Cascade, { Component } from 'cascade';

import { IViewModel } from '../../interfaces/states/IViewModel';

import MessageList from './MessageList';
import MessageForm from './MessageForm';

export interface IMessagesProps {
    viewModel: IViewModel;
}

export default class Messages extends Component<IMessagesProps> {
    render() {
        let { viewModel } = this.props;
        return (
            <div>
                <MessageList viewModel={viewModel} />
                <MessageForm viewModel={viewModel} />
            </div>
        );
    }
}