import Cascade from 'cascade';

import ViewModel from './implementations/states/ViewModel';

import View from './views/View';

export function run(id: string) {
    let viewModel = new ViewModel();
    (window as any).$global = {
        viewModel: viewModel
    };
    Cascade.render(id, <View viewModel={viewModel} />);
}
