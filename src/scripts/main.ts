import firebase from 'firebase';

import config from './config';

export function run() {
    firebase.initializeApp(config);
    return 'Application started...';
}

window.onload = function () {
    console.log(run());
}