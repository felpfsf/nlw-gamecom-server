import express from 'express'

const app = express()

// Game list with ads count
// localhost:3333/games
app.get('/games', (request, response) => {
  return response.json([{ id: 1, name: 'test' }])
})

// Create a new ad
// localhost:3333/games
app.post('/ads', (request, response) => {
  return response.status(201).json([{ id: 1, name: 'test' }])
})

// Listing ads by game
// localhost:3333/
app.get('/games/:id/ads', (request, response) => {
  // const gamesId = request.params.id
  return response.json([
    { id: 3, name: 'Anúncio 1' },
    { id: 2, name: 'Anúncio 2' },
    { id: 3, name: 'Anúncio 3' },
    { id: 4, name: 'Anúncio 4' }
  ])
})

// Search discord by ad ID
// localhost:3333/
app.get('/ads/:id/discord', (request, response) => {
  // const adID = request.params.id
  return response.json([])
})

app.listen(3333)
