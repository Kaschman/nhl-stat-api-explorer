// NHL stats API URL
const baseUrl = 'https://statsapi.web.nhl.com/api/v1'

// Connect to and export database
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

export { baseUrl, database }
