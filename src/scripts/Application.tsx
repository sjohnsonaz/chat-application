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
    firebase.database().ref('/Test').once('value').then((snapshot) => {
        viewModel.value = snapshot.val();
    });
}
