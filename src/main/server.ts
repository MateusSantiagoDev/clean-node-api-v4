// arquivo que vai rodar o servidor

import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

// fazendo a conexão com o banco de dados a partir desse
// ponto não é mais a conexão com uma collection local
MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    // só vai importar o app e rodar o servidor
    // depois que o mongo connectar
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
