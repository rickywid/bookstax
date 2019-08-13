import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/main';
// import Landing from './components/landing';
import ReadAssessment from './components/read-assessment/index';
import BookProfile from './components/books/book-profile';
import Dashboard from './components/dashboard';
import Me from './components/user/me';
import MeList from './components/bookshelf/me-list';
import UserProfile from './components/user/user-profile';
import UserList from './components/bookshelf/user-list';
import UserEdit from './components/user/user-edit';
import Redirect from './components/redirect';
import SearchResults from './components/searchResults';
import SignIn from './components/signin';
import SignUp from './components/signup';
import NoMatch from './components/noMatch';
import RequireAuth from './components/auth/require_auth';

const Routes = (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/read-assessment" component={ReadAssessment} />
    <Route exact path="/book/:book_id" component={BookProfile} />
    <Route exact path="/dashboard" component={RequireAuth(Dashboard)} />
    <Route exact path="/me" component={RequireAuth(Me)} />
    <Route exact path="/me-list" component={RequireAuth(MeList)} />
    <Route exact path="/user/:username/:user_id" component={RequireAuth(UserProfile)} />
    <Route exact path="/user/:username/:user_id/list/:userlist_id" component={RequireAuth(UserList)} />
    <Route exact path="/settings" component={RequireAuth(UserEdit)} />
    <Route exact path="/search" component={SearchResults} />
    <Route exact path="/redirect" component={Redirect} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;
