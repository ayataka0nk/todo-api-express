import express from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import cors, { CorsOptions } from 'cors'

import { route } from './route'

const main = async () => {
  await createConnection()

  const app = express()
  const port = 80
  const corsOptions: CorsOptions = {
    origin: [
      'http://127.0.0.1:8080',
      'http://118.27.0.46:8080',
      'http://www.ayataka0nk.work:8080',
    ],
  }
  app.use(cors(corsOptions))
  app.use(function (req, res, next) {
    res.setHeader('Cache-Control', 'no-cache')
    next()
  })
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  route(app)

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

main()
