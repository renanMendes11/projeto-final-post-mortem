import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import NewUser from './pages/NewUser';
import Home from './pages/Home';
import { AuthProvider } from './auth/AuthContext';
import { PrivateRoute } from './auth/PrivateRoute';
import ContactViewerEdit from './components/ContactViewerEdit';
import ProfileViewerEdit from './components/ProfileViewerEdit';

export default function routes() {
  return (
      <AuthProvider>
        <BrowserRouter>
            <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route path="/newUser" component={NewUser} />
                <Route path="/login" component={Login} />
                <Route path="/contact-viewer-edit" component={ContactViewerEdit} />
                <Route path="/profile-viewer-edit" component={ProfileViewerEdit} />
            </Switch>
        </BrowserRouter>
      </AuthProvider>
  );
}