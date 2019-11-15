import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/home/';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Log from './pages/log';
import Usuarios from './pages/usuarios';
import AlterarUsuarios from './pages/alterarUsuario';
import DeletarUsuarios from './pages/deletarUsuario';


import PrivateRoute from './components/PrivateRoute';

export default function Router() {
  return (
    <>
      <Switch>
        <Route path="/login" exact component={Login}></Route>
        <PrivateRoute path="/" exact component={Home}></PrivateRoute>
        <PrivateRoute path="/logout" exact component={Logout}></PrivateRoute>
        <PrivateRoute path="/register" exact component={Register}></PrivateRoute>
        <PrivateRoute path="/log" exact component={Log}></PrivateRoute>
        <PrivateRoute path="/usuarios" exact component={Usuarios}></PrivateRoute>
        <PrivateRoute path="/usuarios/:id" exact component={AlterarUsuarios}></PrivateRoute>
        <PrivateRoute path="/deletarUsuario/:id" exact component={DeletarUsuarios}></PrivateRoute>
      </Switch>
    </>
  );
}
