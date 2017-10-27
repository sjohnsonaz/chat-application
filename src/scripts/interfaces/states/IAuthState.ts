export interface IAuthState {
    open: boolean;
    loggingIn: boolean;
    loggingOut: boolean;
    loggedIn: boolean;
    email: string;
    password: string;
    index: number;

    createUser(): Promise<void>;
    login(): Promise<void>;
    loginCancel(): void;
    logout(): Promise<void>;
}