'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')


Route.post('/register', 'AuthController.register')
Route.post("/login", "AuthController.authenticate");
Route.put('/users/:id', "AuthController.update")
Route.get('/users/:id', "AuthController.show")
Route.delete('/users/:id', "AuthController.delete")
Route.get('/users/', "AuthController.index")
// Route.resource("user", "AuthController").apiOnly();
Route.resource("port", "PortController").apiOnly();
Route.resource('log', "LogAcessController")