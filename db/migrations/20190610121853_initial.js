// Creates Teams table

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('teams', function(table) {
      table.integer('id').unsigned().primary()
      table.string('name')
      table.string('abbreviation')
      table.string('location_name')
      table.string('team_name')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('teams')
  ])
}
