export interface IAuthState {
    open: boolean;
    loggedIn: boolean;

    loggingIn: boolean;
    loggingOut: boolean;
    saving: boolean;

    email: string;
    password: string;
    displayName;
    photoURL;

    index: number;
    userMenuOpen: boolean;

    createUser(): Promise<void>;
    login(): Promise<void>;
    loginCancel(): void;
    logout(): Promise<void>;
}