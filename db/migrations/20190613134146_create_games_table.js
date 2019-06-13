// Creates Games Table

exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable('games', table => {
        table.integer('id').unsigned().primary()
        table.integer('away_score').unsigned()
        table.integer('away_team').unsigned()
        table.foreign('away_team').references('teams.id')
        table.date('date')
        table.integer('home_score').unsigned()
        table.integer('home_team').unsigned()
        table.foreign('home_team').references('teams.id')
        table.string('link')
        table.string('type')
      })
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('games')
  ])
};
