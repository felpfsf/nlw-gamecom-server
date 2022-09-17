import express from 'express'
import cors from 'cors'
import { Prisma, PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes'
import { convertMinToHourString } from './utils/convert-minutes-to-hour-string'

const app = express()

app.use(express.json())

app.use(
  cors({
    origin: '*'
  })
)

const prisma = new PrismaClient({
  // log: ['query']
})

// Game list with ads count
// localhost:3333/games
app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return response.json(games)
})

// Create a new ad
// localhost:3333/games
app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id

  const body: any = request.body
  // console.log(body)
  // console.log(body.hourStart, body.hourEnd)
  // console.log(typeof body.hourStart, typeof body.hourEnd)

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel
    }
  })

  return response.status(201).json(ad)
})

// Listing ads by game
// localhost:3333/
app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true
    },
    where: {
      gameId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return response.json(
    ads.map(ad => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinToHourString(ad.hourStart),
        hourEnd: convertMinToHourString(ad.hourEnd)
      }
    })
  )
})

// Search discord by ad ID
// localhost:3333/
app.get('/ads/:id/discord', async (request, response) => {
  const adID = request.params.id

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adID
    }
  })

  return response.json({
    discord: ad.discord
  })
})

app.listen(3333)
