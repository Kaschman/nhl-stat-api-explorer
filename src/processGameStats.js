import superagent from 'superagent'

import { baseUrl } from './config'

import Faceoff from './models/faceoff'
import Shot from './models/shot'

const gameUrl = baseUrl + '/game/2018021143/feed/live'
superagent.get(gameUrl)
.then(response => {
  //console.log(response.body)
  const plays = response.body.liveData.plays.allPlays
  const game = response.body.gameData.game.pk
  const awayTeam = response.body.gameData.teams.away.id
  const homeTeam = response.body.gameData.teams.home.id

  console.log(plays.length + ' Events found')

  // Parse play data
  const faceoffs = []
  const shots = []
  plays.map(play => {
    switch (play.result.eventTypeId) {
      case "FACEOFF":
        const faceoff = new Faceoff(game, play)
        faceoffs.push(faceoff)
        break
      case "SHOT":
        const shot = new Shot(game, awayTeam, homeTeam, play)
        shots.push(shot)
      default: break
    }
  })
  console.log('Found ' + faceoffs.length + ' faceoffs')
  console.log('Found ' + shots.length + ' shots')

  // blocked shot

  // missed shot

  // goal

  // penalty

  // hit

  // takeaway

  // giveaway


  // stoppage

  process.exit()
})
