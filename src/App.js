import { STATE_LOGIN, STATE_SIGNUP } from './components/AuthForm';
import { EmptyLayout, LayoutRoute, MainLayout } from './components/Layout';
import PageSpinner from './components/PageSpinner';
import AuthPage from './pages/AuthPage';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './base.css'
const DashboardPage = React.lazy(() => import('./pages/Dashboard'));
const AuthModalPage = React.lazy(() => import('./pages/AuthModalPage'));
const TypesPage = React.lazy(() => import('./pages/TypesPage'));
const UpdateType = React.lazy(() => import('./pages/UpdateTypePage'));
const AddType = React.lazy(() => import('./pages/AddTypePage'));
function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <LayoutRoute
          exact
          path="/login"
          layout={EmptyLayout}
          component={props => <AuthPage {...props} authState={STATE_LOGIN} />}
        />
        <LayoutRoute
          exact
          path="/signup"
          layout={EmptyLayout}
          component={props => <AuthPage {...props} authState={STATE_SIGNUP} />}
        />

        <MainLayout breakpoint={props.breakpoint}>
          <React.Suspense fallback={<PageSpinner />}>
            <Route exact path="/" component={DashboardPage} />
            <Route exact path="/types" component={TypesPage} />
            <Route exact path="/updateType/:deptId" component={UpdateType} />
            <Route exact path="/addType" component={AddType} />
            <Route exact path="/login-modal" component={AuthModalPage} />
            
          </React.Suspense>
        </MainLayout>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
