import React from 'react';
import { Route, browserHistory, IndexRedirect } from 'react-router';
import { authorize } from '../../react-isomorphic-render';

// Gets `user` from Redux state
const getUser = state => state.Authentication.user;
// Restricts a `<Route/>` to a certain part of users
const restricted = (route, authorization) => authorize(getUser, authorization, route);

const routes = (
  <Route
    path="/"
    history={browserHistory}
    getComponent={(nextState, cb) => {
      // This is funny route syntax, however it enables perfect code splitting.
      // Check the inspector...mangled bundle names are produced and requested dynamically for each route here.
      // We can further chunk the code in each of these routes in the same way.
      // In this manner, we prepare ourselves wonderfully for PWAs with a service worker.
       System.import('./pages/Layout/Layout').then(file => cb(null, file.default));
    }} 
  >
    <IndexRedirect to='users' />
    <Route
      path="login"
      getComponent={(nextState, cb) => {
       System.import('./pages/AuthPage/AuthPage').then(file => cb(null, file.default));
      }} 

    />
    <Route
      path="notfound"
      getComponent={(nextState, cb) => {
       System.import('./pages/NotFound/NotFound').then(file => cb(null, file.default));
      }} 

    />
    <Route
      path="users"
      getComponent={(nextState, cb) => {
       System.import('./pages/Home/Home').then(file => cb(null, restricted(file.default, user => user.role === 'admin')))
    }}
    />
    <Route
      path="*"
      getComponent={(nextState, cb) => {
       System.import('./pages/NotFound/NotFound').then(file => cb(null, file.default));
      }} 
    />
  </Route>
);

export default routes;
