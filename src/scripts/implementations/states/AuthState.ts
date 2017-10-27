import { observable } from 'cascade';
import firebase from 'firebase';

export default class AuthState {
    @observable open: boolean = false;
    @observable loggingIn: boolean = false;
    @observable loggingOut: boolean = false;
    @observable loggedIn: boolean = false;
    @observable email: string = '';
    @observable password: string = '';
    @observable index: number = 0;

    async createUser() {
        this.loggingIn = true;
        try {
            await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
            this.loggedIn = true;
            this.open = false;
            this.email = '';
            this.password = '';
        } catch (e) {
            throw e;
        } finally {
            this.loggingIn = false;
        }
    }

    async login() {
        this.loggingIn = true;
        try {
            await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
            this.loggedIn = true;
            this.open = false;
            this.email = '';
            this.password = '';
        } catch (e) {
            throw e;
        } finally {
            this.loggingIn = false;
        }
    }

    loginCancel() {
        this.open = false;
        this.email = '';
        this.password = '';
    }

    async logout() {
        this.loggingOut = true;
        try {
            await firebase.auth().signOut();
            this.loggedIn = false;
        } catch (e) {
            throw e;
        } finally {
            this.loggingOut = false;
        }
    }
}