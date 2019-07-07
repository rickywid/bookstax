import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/landing';
import Search from './components/search';
import ReadAssessment from './components/read-assessment/index';
import BookProfile from './components/books/book-profile';
import Dashboard from './components/dashboard';
import UserProfile from './components/user/user-profile';
import UserList from './components/user/user-list';
import UserEdit from './components/user/user-edit';
import NoMatch from './components/noMatch';

const Routes = (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/read-assessment" component={ReadAssessment} />
    <Route exact path="/book/:book_id" component={BookProfile} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/user/:user_id" component={UserProfile} />
    <Route exact path="/user/:user_id/list/:userlist_id" component={UserList} />
    <Route exact path="/user/edit/:user_id" component={UserEdit} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;
