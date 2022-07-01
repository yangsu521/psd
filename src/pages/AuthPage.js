import AuthForm, { STATE_LOGIN } from '../components/AuthForm';
import React from 'react';
import { Card, Grid } from '@material-ui/core';

class AuthPage extends React.Component {
  handleAuthState = authState => {
    if (authState === STATE_LOGIN) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/signup');
    }
  };

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <Grid container md={6} lg={4}>
        <Card >
          <AuthForm
            authState={this.props.authState}
            onChangeAuthState={this.handleAuthState}
            onLogoClick={this.handleLogoClick}
          />
        </Card>
      </Grid>
    );
  }
}

export default AuthPage;
