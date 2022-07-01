import AuthForm, { STATE_LOGIN } from '../components/AuthForm';
import React from 'react';
import { Button, Dialog, DialogContent } from '@material-ui/core';

class AuthModal extends React.Component {
  state = {
    show: true,
    authState: STATE_LOGIN,
  };

  toggle = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  handleAuthState = authState => {
    this.setState({
      authState,
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggle}>
          Login
        </Button>
        <Dialog
          open={this.state.show}
          onClose={this.toggle}
          maxWidth="sm"
         >
          <DialogContent>
            <AuthForm
              authState={this.state.authState}
              onChangeAuthState={this.handleAuthState}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default AuthModal;
