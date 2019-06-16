import superagent from 'superagent'

import { baseUrl } from './config'

import Faceoff from './models/faceoff'

const gameUrl = baseUrl + '/game/2018021143/feed/live'
superagent.get(gameUrl)
.then(response => {
  //console.log(response.body)
  const plays = response.body.liveData.plays.allPlays
  const game = response.body.gameData.game.pk

  console.log(plays.length + ' Events found')

  // Parse play data
  const faceoffs = []
  plays.map(play => {
    switch (play.result.eventTypeId) {
      case "FACEOFF":
        const faceoff = new Faceoff(game, play)
        faceoffs.push(faceoff)
        break
      default: break
    }
  })
  console.log('Found ' + faceoffs.length + ' faceoffs')

  // shot

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
