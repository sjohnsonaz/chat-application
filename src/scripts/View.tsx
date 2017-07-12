import Cascade, { Component } from 'cascade';
import { Section } from 'cascade-components';

export interface IViewProps {

}

export default class View extends Component<IViewProps> {
    render() {
        return (
            <Section title="Chat Application">
                <div>Test</div>
            </Section>
        );
    }
}

export function run(id: string) {
    Cascade.render(id, <View />);
}
