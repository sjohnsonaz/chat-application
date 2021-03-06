import { observable, hash, ObservableArray, IHash } from 'cascade';
import firebase from 'firebase';

import ManagedCollection, { TypedSnapshot } from '../../util/ManagedCollection';

import { IViewModel, IMessage, IConversation, IConversationMembers, IConversationMessages } from '../../interfaces/states/IViewModel';
import { IAuthState } from '../../interfaces/states/IAuthState';
import AuthState from '../../implementations/states/AuthState';

export default class ViewModel implements IViewModel {
    conversationCollection: ManagedCollection<IConversation> = new ManagedCollection('/Conversations');
    conversationMessagesCollection: ManagedCollection<IMessage> = new ManagedCollection('/ConversationMessages');
    conversationMembersCollection: ManagedCollection<IConversationMembers> = new ManagedCollection('/ConversationMembers');

    authState: IAuthState = new AuthState();
    @observable conversation: TypedSnapshot<IConversation>;
    @observable title: string = '';
    @observable get titleValid() {
        return !!this.title;
    }
    @observable message: string = '';
    @observable get messageValid() {
        return !!this.message;
    }
    @observable value: number = 1234;
    @observable tabIndex: number = 0;
    @observable active: boolean = false;

    constructor() {
        this.conversationCollection.start();
    }

    setTabIndex(tabIndex: number) {
        this.tabIndex = tabIndex;
    }

    setActive(active: boolean) {
        this.active = active;
    }

    async openConversation(conversation: TypedSnapshot<IConversation>) {
        this.conversation = conversation;
        let ref = await this.conversationMessagesCollection.updateRef(conversation.key);
        this.tabIndex = 1;
        return ref;
    }

    async createConversation() {
        let ref = await this.conversationCollection.create({
            title: this.title,
            lastMessage: null,
            timestamp: new Date(Date.now()).toUTCString(),
        });
        let conversation = await ref.once('value');
        await this.conversationMessagesCollection.getRef(conversation.key).set({});
        this.title = '';
        this.openConversation(conversation);
        return ref;
    }

    async deleteConversation(conversation: TypedSnapshot<IConversation>) {
        if (this.conversation === conversation) {
            this.conversation = undefined;
        }
        await this.conversationMessagesCollection.getRef(conversation.key).remove();
        await this.conversationCollection.delete(conversation);
    }

    async sendMessage() {
        let ref = await this.conversationMessagesCollection.create({
            email: firebase.auth().currentUser.email,
            text: this.message,
            date: new Date(Date.now()).toUTCString()
        });
        this.message = '';
        return ref;
    }

    delete(data: TypedSnapshot<IMessage>) {
        this.conversationMessagesCollection.delete(data);
    }
}