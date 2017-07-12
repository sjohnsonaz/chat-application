import firebase from 'firebase';

import config from './config';
import { run as runView } from './Application';

export function run() {
    try {
        firebase.initializeApp(config);
        firebase.auth();
        firebase.storage();
        firebase.database();
    }
    finally {
        runView('root');
        return 'Application started...';
    }
}

window.onload = function () {
    console.log(run());
}