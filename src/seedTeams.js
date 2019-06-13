import superagent from 'superagent'
import { baseUrl, database } from './config'

import type { Team } from './models/team'
import { serialize, toSQL } from './models/team'

const teamsUrl = baseUrl + '/teams'
superagent.get(teamsUrl)
.end(async (error, response) => {
  if (error) {
    console.log('Error Occured')
    console.log(error)
  } else {
    await database('teams').del()
    const teams: Team[] = response.body.teams.map(team => serialize(team))

    const teamsSql = teams.map(team => toSQL(team))
    await database('teams').insert(teamsSql)

    console.log('--------------------')
    console.log('Saved ' + teamsSql.length + ' teams')
    console.log('--------------------')

    process.exit()
  }
})
