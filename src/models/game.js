type Game = {
  id: number,
  awayScore: number,
  awayTeam: string,
  date: Date,
  homeScore: number,
  homeTeam: string,
  link: string,
  season: string,
  type: string,
}

export type { Game }

export const serialize = (json: any): Game => {
  const game: Game = {
    id: json.gamePk,
    awayScore: json.teams.away.score,
    awayTeam: json.teams.away.team.id,
    date: json.gameDate,
    homeScore: json.teams.home.score,
    homeTeam: json.teams.home.team.id,
    link: json.link,
    season: json.season,
    type: json.gameType,
  }
  return game
}

export const toSQL = (game: Game): any => {
  return {
    id: game.id,
    away_score: game.awayScore,
    away_team: game.awayTeam,
    date: game.date,
    home_score: game.homeScore,
    home_team: game.homeTeam,
    link: game.link,
    season: game.season,
    type: game.type
  }
}
