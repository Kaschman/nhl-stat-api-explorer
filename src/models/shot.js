class Shot {

  // Properties
  description: string
  eventIdx: number
  game: number
  goalie: number
  period: number
  periodTime: string
  savingTeam: number
  secondaryType: string
  shooter: number
  shootingTeam: number
  x: number
  y: number

  constructor(game: number, awayTeam: number, homeTeam: number, json: any) {
    this.description = json.result.description
    this.eventIdx = json.about.eventIdx
    this.game = game
    this.period = json.about.period
    this.periodTime = json.about.periodTime
    this.secondaryType = json.result.secondaryType
    this.x = json.coordinates.x
    this.y = json.coordinates.y

    // Players
    json.players.map(player => {
      if (player.playerType === 'Goalie') {
        this.goalie = player.player.id
      } else if (player.playerType === 'Shooter') {
        this.shooter = player.player.id
      }
    })

    // Teams
    const shootingTeam = json.team.id
    this.shootingTeam = shootingTeam
    this.savingTeam = shootingTeam !== awayTeam ? awayTeam : homeTeam
  }

  toSql(): any {
    return {
      game: this.game,
      goalie: this.goalie,
      shooter: this.shooter,
      description: this.description,
      secondary_type: this.secondaryType,
      event_idx: this.eventIdx,
      x: this.x,
      y: this.y,
      period: this.period,
      period_time: this.periodTime,
      shooting_team: this.shootingTeam,
      saving_team: this.savingTeam,
    }
  }
}

export default Shot
