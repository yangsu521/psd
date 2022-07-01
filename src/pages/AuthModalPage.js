import AuthForm, { STATE_LOGIN } from '../components/AuthForm';

import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  Grid,
} from '@material-ui/core';

class AuthModalPage extends React.Component {
  state = {
    show: false,
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
      <Grid container xs={12}>
        <Card>
          <CardHeader>Login Modal Example</CardHeader>
          <CardContent>
            <Button onClick={this.toggle}>Click to Login</Button>
            <Dialog open={this.state.show} onClose={this.toggle} maxWidth="sm">
              <DialogContent>
                <AuthForm
                  authState={this.state.authState}
                  onChangeAuthState={this.handleAuthState}
                />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default AuthModalPage;
