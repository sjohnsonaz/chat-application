import Cascade from 'cascade';

import View from './View';

export function run(id: string) {
    Cascade.render(id, <View />);
}
