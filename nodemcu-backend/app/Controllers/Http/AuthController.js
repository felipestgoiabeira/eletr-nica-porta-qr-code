'use strict'

const User = use('App/Models/User')
const validator = require("../../../resources/validator")

class AuthController {
    async register({ request, response}) {
        console.log(request.all())
        const {name, password, email, admin, hour_start,
        hour_end} = request.all();
        const valid = validator(request.all())
        console.log(valid)
        if (!valid.hora) {
            console.log("Error na data")
            return({ "error": "Hora de início deve ser antes da saída" })
        }
        if (!valid.password ) {
            console.log("Error na password")
            return { "error": "Senha não são iguais" }
        }

        const user = await User.create({name, password, email, admin, hour_start,
            hour_end});
        return user;



    }
    async authenticate({ request, auth, response }) {
        const { email, password, fromNode } = request.all();

        try {

            const user = await User.findOrFail({ "email": email })
            //console.log(user.admin)
            if (user.admin || fromNode) {
                const token = await auth.attempt(email, password);
                return token;
            }
            return { "isNotAdmin": "true" }

        } catch (error) {
            response.send({ "invalidLogin": "true" })
        }



    }
    async index() {
        const users = await User.all();
        return users;
    }
    async update({ params, request }) {
        // console.log(params.id)
        const user = await User.findOrFail(params.id);

        const data = request.only(['name', 'password', 'email',
            'type', 'hour_start', 'hour_end', 'admin']);
        console.log(user.email)
        user.merge(data);
        await user.save();

        return user
    }

    async show({ params }) {
        const user = await User.findOrFail(params.id);
        return user

    }

    async delete({ params }) {
        const user = await User.findOrFail(params.id);
        await user.delete()
        return ({ 'sucess': 'true' })

    }
}

module.exports = AuthController
