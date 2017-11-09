import Cascade, { Component } from 'cascade';
import { Button, Form, FormInput, FormActions, FormContainer } from 'cascade-components';

import { IViewModel } from '../../interfaces/states/IViewModel';

export interface IConversationsProps {
    viewModel: IViewModel;
}

export default class Conversations extends Component<IConversationsProps> {
    createConversation = (event: MouseEvent) => {
        event.preventDefault();
        this.props.viewModel.createConversation();
    }

    render() {
        let { viewModel } = this.props;
        return (
            <Form>
                <FormContainer title="Title">
                    <FormInput type="text" model={viewModel} modelProp="title" className="input" />
                </FormContainer>
                <FormActions>
                    <Button onclick={this.createConversation} disabled={!viewModel.titleValid} lockContent="Saving..." locked={viewModel.conversationCollection.creating} theme="primary">Create Conversation</Button>
                </FormActions>
            </Form>
        );
    }
}