import { observable, hash, ObservableArray, IHash } from 'cascade';
import firebase from 'firebase';

import FireBaseCollection, { TypedSnapshop } from '../../util/FireBaseCollection';

import { IViewModel, IMessage, IConversation, IConversationMembers, IConversationMessages } from '../../interfaces/states/IViewModel';
import { IAuthState } from '../../interfaces/states/IAuthState';
import AuthState from '../../implementations/states/AuthState';

export default class ViewModel implements IViewModel {
    conversationCollection: FireBaseCollection<IConversation> = new FireBaseCollection('/Conversations');
    conversationMessagesCollection: FireBaseCollection<IMessage> = new FireBaseCollection('/ConversationMessages');
    conversationMembersCollection: FireBaseCollection<IConversationMembers> = new FireBaseCollection('/ConversationMembers');

    authState: IAuthState = new AuthState();
    @observable conversation: TypedSnapshop<IConversation>;
    @observable title: string = '';
    @observable message: string = '';
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

    openConversation(conversation: TypedSnapshop<IConversation>) {
        this.conversation = conversation;
        let ref = this.conversationMessagesCollection.updateRef(conversation.key);
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

    async deleteConversation(conversation: TypedSnapshop<IConversation>) {
        await this.conversationMessagesCollection.remove();
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

    delete(data: TypedSnapshop<IMessage>) {
        this.conversationMessagesCollection.delete(data);
    }
}