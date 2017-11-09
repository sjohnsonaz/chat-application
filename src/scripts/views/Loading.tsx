import Cascade, { Component } from 'cascade';

export interface ILoadingProps {

}

export default class Loading extends Component<ILoadingProps> {
    render() {
        return (
            <div className="loading-fixed">Loading</div>
        );
    }
}