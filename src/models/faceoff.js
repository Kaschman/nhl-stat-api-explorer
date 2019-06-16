class Faceoff {

  // Properties
  description: string
  eventIdx: number
  game: number
  losingPlayer: number
  period: number
  periodTime: string
  winningPlayer: number
  winningTeam: number
  x: number
  y: number

  // Methods
  constructor(game: number, json: any) {
    this.description = json.result.description
    this.eventIdx = json.about.eventIdx
    this.game = game
    this.period = json.about.period
    this.periodTime = json.about.periodTime
    this.winningTeam = json.team.id
    this.x = json.coordinates.x
    this.y = json.coordinates.y

    // Players
    json.players.map(player => {
      if (player.playerType === 'Winner') {
        this.winningPlayer = player.player.id
      } else if (player.playerType == 'Loser') {
        this.losingPlayer = player.player.id
      }
    })
  }

  toSql(): any {
    return {
      description: this.description,
      event_idx: this.eventIdx,
      game: this.game,
      losing_player: this.losingPlayer,
      period_time: this.periodTime,
      period: this.period,
      winning_player: this.winningPlayer,
      winning_team: this.winningTeam,
      x: this.x,
      y: this.y,
    }
  }
}

export default Faceoff
