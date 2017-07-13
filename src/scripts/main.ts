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
    }
}

window.onload = function () {
    run();
    console.log('Application started...');
}