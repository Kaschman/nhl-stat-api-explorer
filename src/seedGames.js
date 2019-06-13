import chalk from 'chalk'
import superagent from 'superagent'
import yargs from 'yargs'

import type { Game } from './models/game'

import { baseUrl, database } from './config'
import { serialize, toSQL } from './models/game'

// *** Arguments *** //
const args = yargs.argv
// A team ID must be passed to the method as a --team parameter
if (!args.team) {
  console.error(chalk.red('ERROR: Must include a -t parameter'))
  process.exit()
}
const teamId = args.team

const scheduleUrl = baseUrl + '/schedule'
superagent.get(scheduleUrl)
.query({ teamId })
.query({ startDate: '2018-07-01' })
.query({ endDate: '2019-07-01' })
.then(async response => {
  if (response.body.totalGames === 0) {
    console.log(chalk.yellow('Warning: No games found for specified team & date range.'))
    process.exit()
  }

  // Isolate part of json we want to operate on
  const gamesJson = response.body.dates.map(temp => {
    return temp.games[0]
  })

  const games: Game[] = gamesJson.map(game => serialize(game))
  const gamesSql = games.map(game => toSQL(game))
  await database('games').insert(gamesSql)

  console.log('--------------------')
  console.log('Saved ' + gamesSql.length + ' games')
  console.log('--------------------')

  process.exit()
})
