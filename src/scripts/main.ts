import firebase from 'firebase';
import Promise from 'promise-polyfill';

// To add to window
if (!window['Promise']) {
    window['Promise'] = Promise;
}

import config from './config';
import { run as runView } from './Application';

export function run() {
    try {
        firebase.initializeApp(config);
        firebase.auth();
        firebase.storage();
        window['firebase'] = firebase;
    }
    finally {
        runView('root');
    }
}

window.onload = function () {
    run();
    console.log('Application started...');
}