// Creates Team table

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('teams', function(table) {
      table.string('id').primary()
      table.string('name')
      table.string('abbreviation')
      table.string('location_name')
      table.string('team_name')
      table.timestamps(true, true)
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('teams')
  ])
}
