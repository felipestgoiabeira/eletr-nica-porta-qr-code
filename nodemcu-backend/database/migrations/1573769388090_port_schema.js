'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PortSchema extends Schema {
  up () {
    this.create('ports', (table) => {
      table.boolean("port_open").notNullable()
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('ports')
  }
}

module.exports = PortSchema
