import superagent from 'superagent'
import { database } from './config'

import type { Team } from './models/team'
import { serialize, toSQL } from './models/team'

superagent.get('https://statsapi.web.nhl.com/api/v1/teams')
.end(async (error, response) => {
  if (error) {
    console.log('Error Occured')
    console.log(error)
  } else {
    await database('teams').del()
    const teams: Team[] = response.body.teams.map(team => serialize(team))

    const temp = teams.map(team => toSQL(team))
    await database('teams').insert(temp)

    process.exit()
  }
})

const deleteTeams = async () => {
  return
}

const saveTeams = async (teams: Team[]) => {

}
