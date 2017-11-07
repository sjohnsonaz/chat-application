import Cascade, { Component } from 'cascade';
import { Button, MenuBar, MenuBarLink, MenuBarSpacer, UserThumbnail } from 'cascade-components';

import { IViewModel } from '../interfaces/states/IViewModel';

export interface IMenuProps {
    viewModel: IViewModel;
}

export default class Menu extends Component<IMenuProps> {
    openLoginModal = (event: Event) => {
        event.preventDefault();
        this.props.viewModel.authState.open = true;
    }
    logout = (event: Event) => {
        event.preventDefault();
        this.props.viewModel.authState.logout();
    }
    togglePopover = (event: Event) => {
        event.preventDefault();
        this.props.viewModel.authState.userMenuOpen = !this.props.viewModel.authState.userMenuOpen;
    }
    closePopover = (event: Event) => {
        event.preventDefault();
        this.props.viewModel.authState.userMenuOpen = false;
    }
    render() {
        let { viewModel } = this.props;
        let { authState } = viewModel;
        return (
            <MenuBar title="Chat Application" top>
                <MenuBarSpacer />
                <MenuBarLink
                    reverse
                    simple
                    noLink
                    title={
                        <UserThumbnail
                            src=""
                            placeholder="C"
                            size="small"
                            popover={authState.loggedIn ?
                                <Button onclick={this.logout}>Logout</Button> :
                                <Button onclick={this.openLoginModal}>Login</Button>}
                            popoverDirection="bottom"
                            popoverAlign="right"
                            popoverMenu
                            popoverOpen={authState.userMenuOpen}
                            onclick={this.togglePopover}
                            onPopoverClose={this.closePopover}
                        />
                    }
                />
            </MenuBar>
        )
    }
}