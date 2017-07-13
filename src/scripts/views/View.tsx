import Cascade, { Component } from 'cascade';
import { Section, Button, ButtonBar, Tab } from 'cascade-components';

import { IViewModel } from '../interfaces/states/IViewModel';

export interface IViewProps {
    viewModel: IViewModel;
}

export default class View extends Component<IViewProps> {
    render() {
        let { viewModel } = this.props;
        return (
            <div class="container">
                <Section title="Chat Application">
                    <Tab
                        activeIndex={viewModel.tabIndex}
                        onSelectPanel={viewModel.setTabIndex}
                        titles={[
                            'Tab 0',
                            'Tab 1',
                            'Tab 2'
                        ]} animated>
                        <div>
                            Tab 0
                            <div>Messages</div>
                            <ul>
                                {viewModel.messages.map((message) => {
                                    return <li>{message}</li>
                                })}
                            </ul>
                        </div>
                        <div>Tab 1</div>
                        <div>Tab 2</div>
                    </Tab>
                </Section>
            </div>
        );
    }
}