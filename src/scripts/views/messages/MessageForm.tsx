import Cascade, { Component } from 'cascade';
import { Button, Form, FormInput, FormActions, FormContainer } from 'cascade-components';

import { IViewModel } from '../../interfaces/states/IViewModel';

export interface IMessageFormProps {
    viewModel: IViewModel;
}

export default class MessageForm extends Component<IMessageFormProps> {
    sendMessage = (event: Event) => {
        event.preventDefault();
        this.props.viewModel.sendMessage();
    }

    render() {
        let { viewModel } = this.props;
        return (
            <Form>
                <FormContainer title="Message">
                    <FormInput type="text" className="input" model={viewModel} modelProp="message" />
                </FormContainer>
                <FormActions>
                    <Button onclick={this.sendMessage} disabled={!viewModel.message} theme="primary">Send</Button>
                </FormActions>
            </Form>
        );
    }
}