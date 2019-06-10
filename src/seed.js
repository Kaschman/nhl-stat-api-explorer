import superagent from "superagent"

superagent.get('https://statsapi.web.nhl.com/api/v1/teams')
.end((error, response) => {
  if (error) {
    console.log('Error Occured')
    console.log(error)
  }
  else {
    console.log(response.body)
  }
})
