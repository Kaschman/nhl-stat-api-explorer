// Adds stat categories
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('games', games => {
      games.boolean('stats_processed').defaultTo(false)
    }),

    knex.schema.createTable('players', players => {
      players.integer('id').unsigned().primary()
      players.string('full_name')
    }),

    knex.schema.createTable('faceoffs', faceoffs => {
      faceoffs.increments('id').primary()
      faceoffs.integer('game').unsigned()
      faceoffs.foreign('game').references('games.id')
      faceoffs.integer('winning_team').unsigned()
      faceoffs.foreign('winning_team').references('teams.id')
      faceoffs.integer('winning_player').unsigned()
      faceoffs.foreign('winning_player').references('players.id')
      faceoffs.integer('losing_player').unsigned()
      faceoffs.foreign('losing_player').references('players.id')
      faceoffs.float('x')
      faceoffs.float('y')
      faceoffs.string('description')
      faceoffs.integer('period').unsigned()
      faceoffs.string('period_time')
      faceoffs.integer('event_idx').unsigned()
    }),

    knex.schema.createTable('shots', shots => {
      shots.increments('id').primary()
      shots.integer('game').unsigned()
      shots.foreign('game').references('games.id')
      shots.integer('goalie').unsigned()
      shots.foreign('goalie').references('players.id')
      shots.integer('shooter').unsigned()
      shots.foreign('shooter').references('players.id')
      shots.string('description')
      shots.string('secondary_type')
      shots.integer('event_idx').unsigned()
      shots.float('x')
      shots.float('y')
      shots.integer('period').unsigned()
      shots.string('period_time')
      shots.integer('shooting_team').unsigned()
      shots.foreign('shooting_team').references('teams.id')
      shots.integer('saving_team').unsigned()
      shots.foreign('saving_team').references('teams.id')
    })
  ])
};

exports.down = function(knex, Promise) {

};
