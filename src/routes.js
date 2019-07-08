import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Main from './components/main';
import Landing from './components/landing';
import Search from './components/search';
import ReadAssessment from './components/read-assessment/index';
import BookProfile from './components/books/book-profile';
import Dashboard from './components/dashboard';
import UserProfile from './components/user/user-profile';
import UserList from './components/user/user-list';
import UserEdit from './components/user/user-edit';
import Redirect from './components/redirect';
import NoMatch from './components/noMatch';

import RequireAuth from './components/auth/require_auth';

const Routes = (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/read-assessment" component={ReadAssessment} />
    <Route exact path="/book/:book_id" component={BookProfile} />
    <Route exact path="/dashboard" component={RequireAuth(Dashboard)} />
    <Route exact path="/user/:user_id" component={RequireAuth(UserProfile)} />
    <Route exact path="/user/:user_id/list/:userlist_id" component={RequireAuth(UserList)} />
    <Route exact path="/user/:user_id/edit" component={RequireAuth(UserEdit)} />
    <Route exact path="/redirect" component={Redirect} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;
