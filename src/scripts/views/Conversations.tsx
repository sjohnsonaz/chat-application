import Cascade, { Component } from 'cascade';
import { Button, ButtonBar, Form, FormInput, FormActions, FormContainer, Section, Tab } from 'cascade-components';
import firebase from 'firebase';

import { IViewModel, IMessage, IConversation } from '../interfaces/states/IViewModel';
import { TypedSnapshop } from '../util/FireBaseCollection';

export interface IConversationsProps {
    viewModel: IViewModel;
}

export default class Conversations extends Component<IConversationsProps> {
    createConversation = (event: MouseEvent) => {
        event.preventDefault();
        this.props.viewModel.createConversation();
    }

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
            <div>
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
                <Form>
                    <FormContainer title="Title">
                        <FormInput type="text" model={viewModel} modelProp="title" className="input" />
                    </FormContainer>
                    <FormActions>
                        <Button onclick={this.createConversation} disabled={!viewModel.title} theme="primary">Create Conversation</Button>
                    </FormActions>
                </Form>
            </div>
        );
    }
}