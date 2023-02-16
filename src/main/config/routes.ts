import { Express, Router } from 'express'
import fg from 'fast-glob'

// aqui será configuradas as rotas
export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  // dentro de routes vou olhar qualquer arquivo
  // que termine com routes.ts e retornar uma
  // lista com o path completo desses arquivos
  fg.sync('**/src/main/routes/**routes.ts').map(async file => {
    const route = (await import(`../../../${file}`)).default
    return route(router)
  })
}
