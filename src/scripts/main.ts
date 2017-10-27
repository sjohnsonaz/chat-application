import firebase from 'firebase';
require('es6-promise').polyfill();

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