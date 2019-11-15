'use strict'

const User = use('App/Models/User')

class AuthController {
    async register({ request }) {
        console.log(request.all())
        const data = request.only(['username', 'password', 'email',
            'type', 'acess_initial', 'acess_final', 'admin']);
        const user = await User.create(data);
        return user;

    }
    async authenticate({ request, auth }) {
        const { email, password } = request.all();

        const token = await auth.attempt(email, password);

        return token;
    }
    async index() {
        const users = await User.all();
        return users;
    }
    async update({ params, request }) {
        // console.log(params.id)
        const user = await User.findOrFail(params.id);
        
        const data = request.only(['username', 'password', 'email',
        'type', 'acess_initial', 'acess_final', 'admin']);
        console.log(user.email)
        user.merge(data);
        await user.save();

        return user
    }

    async show({params}){
        const user = await User.findOrFail(params.id);
        return user

    }

    async delete({params}){
        const user = await User.findOrFail(params.id);
        await user.delete() 
        return({'sucess': 'true'})

    }
}

module.exports = AuthController
