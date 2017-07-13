import Cascade from 'cascade';
import firebase from 'firebase';

import ViewModel from './implementations/states/ViewModel';

import View from './views/View';

export function run(id: string) {
    let viewModel = new ViewModel();
    (window as any).$global = {
        viewModel: viewModel
    };
    Cascade.render(id, <View viewModel={viewModel} />);

    // Load data
    let messagesRef = firebase.database().ref('/Messages');
    messagesRef.on('child_added', (data) => {
        viewModel.messages.set(parseInt(data.key), data.val());
    });

    messagesRef.on('child_changed', (data) => {
        viewModel.messages.set(parseInt(data.key), data.val());
    });

    messagesRef.on('child_removed', (data) => {
        viewModel.messages.remove(parseInt(data.key));
    });
}
