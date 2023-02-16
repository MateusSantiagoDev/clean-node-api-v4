import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'

// aqui será configuradas as rotas
export default (app: Express): void => {
  app.use(bodyParser)
}
