'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ports
 */

const User = use('App/Models/User')
const Log = use('App/Models/LogAcess')
const Port = use('App/Models/Port')
const Database = use('Database');
class PortController {
  /**
   * Show a list of all ports.
   * GET ports
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new port.
   * GET ports/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {


  }

  /**
   * Create/save a new port.
   * POST ports
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const port = await Port.create({ "port_open": "0" })
    return port
  }

  /**
   * Display a single port.
   * GET ports/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing port.
   * GET ports/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update port details.
   * PUT or PATCH ports/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const trx = await Database.beginTransaction();
    try {
      const data = request.only(['port_open'])
      const port = await Port.findOrFail(1, trx)
      console.log(port.port_open)
      if (port.port_open == "0" && data.port_open == "1") {
        const user = await User.findOrFail(params.id, trx)
        const port = await Port.findOrFail(1, trx)
        port.merge(data)
        await port.save(trx)
        await Log.create({ 'user_id': user.id }, trx)
        trx.commit()
      }
      else{
        console.log('else')
        port.merge(data)
        await port.save(trx)
        trx.commit()
      }

    } catch (err) {

      trx.rollback()
      console.log("Error", err)
      response.status(404).send({ "sucess": "false" });

    }

    return { "sucess": "true" }
  }

  /**
   * Delete a port with id.
   * DELETE ports/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = PortController
