import Cascade, { Component } from 'cascade';
import { Section, Tab } from 'cascade-components';

import { IViewModel } from '../interfaces/states/IViewModel';

import Conversations from './conversations/Conversations';
import Messages from './messages/Messages';

export interface IChatProps {
    viewModel: IViewModel;
}

export default class Chat extends Component<IChatProps> {
    setTabIndex = (tabIndex: number) => {
        this.props.viewModel.setTabIndex(tabIndex);
    }

    render() {
        let { viewModel } = this.props;
        let conversationTitle = undefined;
        if (viewModel.conversation) {
            let conversation = viewModel.conversation.val();
            if (conversation && conversation.title) {
                conversationTitle = conversation.title;
            }
        }
        return (
            <Section title="Chat Application">
                <Tab
                    activeIndex={viewModel.tabIndex}
                    onSelectPanel={this.setTabIndex}
                    titles={conversationTitle
                        ? ['Conversations', conversationTitle]
                        : ['Conversations']}
                    animated>
                    <Conversations viewModel={viewModel} />
                    <Messages viewModel={viewModel} />
                </Tab>
            </Section>
        );
    }
}