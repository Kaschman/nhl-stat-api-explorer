type Team = {
  id: number,
  name: string,
  abbreviation: string,
  locationName: string,
  teamName: string,
}

export type { Team }

export const serialize = (json: any): Team => {
  const team: Team = {
    id: json.id,
    name: json.name,
    abbreviation: json.abbreviation,
    locationName: json.locationName,
    teamName: json.teamName,
  }
  return team
}

export const toSQL = (team: Team): any => {
  return {
    id: team.id,
    name: team.name,
    abbreviation: team.abbreviation,
    location_name: team.locationName,
    team_name: team.teamName,
  }
}
