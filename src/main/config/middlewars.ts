import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'
import { cors } from '../middlewares/cors'

// aqui será configuradas as rotas
export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
}
