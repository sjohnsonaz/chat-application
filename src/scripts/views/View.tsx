import Cascade, { Component } from 'cascade';
import { Section, Button, ButtonBar, Tab, Form, FormInput, FormActions, FormContainer } from 'cascade-components';

import { IViewModel } from '../interfaces/states/IViewModel';

export interface IViewProps {
    viewModel: IViewModel;
}

export default class View extends Component<IViewProps> {
    setTabIndex = (tabIndex: number) => {
        this.props.viewModel.setTabIndex(tabIndex);
    }
    send = (event: Event) => {
        event.preventDefault();
        this.props.viewModel.send();
    }
    setMessage = (event: Event) => {
        this.props.viewModel.message = (event.target as any).value;
    }
    render() {
        let { viewModel } = this.props;
        return (
            <div class="container">
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
                            <ul>
                                {viewModel.messages.map((message) => {
                                    return <li>{message}</li>
                                })}
                            </ul>
                            <Form>
                                <FormContainer title="Message">
                                    <input type="text" className="input" value={viewModel.message} onchange={this.setMessage} />
                                </FormContainer>
                                <FormActions>
                                    <Button onclick={this.send} theme="primary">Send</Button>
                                </FormActions>
                            </Form>
                        </div>
                        <div>Tab 1</div>
                        <div>Tab 2</div>
                    </Tab>
                </Section>
            </div>
        );
    }
}