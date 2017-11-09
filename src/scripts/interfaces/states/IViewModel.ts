import { IHash } from 'cascade';
import firebase from 'firebase';

import ManagedCollection, { TypedSnapshot } from '../../util/ManagedCollection';

import { IAuthState } from './IAuthState';

export interface IConversation {
    title: string;
    lastMessage: string;
    timestamp: string;
}

export interface IMessage {
    email: string;
    text: string;
    date: string;
}

export interface IConversationMessages {
    [index: string]: IMessage;
}

export interface IMember {
    active: boolean;
}

export interface IConversationMembers {
    [email: string]: IMember;
}

export interface IViewModel {
    authState: IAuthState;
    conversation: TypedSnapshot<IConversation>;
    conversationCollection: ManagedCollection<IConversation>;
    conversationMessagesCollection: ManagedCollection<IMessage>;
    conversationMembersCollection: ManagedCollection<IConversationMembers>;
    title: string;
    titleValid: boolean;
    message: string;
    messageValid: boolean;
    value: number;
    tabIndex: number;
    active: boolean;

    setTabIndex(tabIndex: number): void;
    setActive(active: boolean): void;
    openConversation(conversation: TypedSnapshot<IConversation>): Promise<firebase.database.Reference>;
    createConversation(): Promise<firebase.database.Reference>;
    deleteConversation(conversation: TypedSnapshot<IConversation>): Promise<any>;
    sendMessage(): Promise<firebase.database.Reference>;
    delete(data: firebase.database.DataSnapshot): void;
}