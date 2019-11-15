'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LogAcessSchema extends Schema {
  up () {
    this.create('log_acesses', (table) => {
      table.integer("user_id")
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')

      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('log_acesses')
  }
}

module.exports = LogAcessSchema
