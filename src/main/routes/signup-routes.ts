import { Router } from 'express'

// estou recebendo os paths (default) do routes.ts
export default (router: Router): void => {
  router.post('/signup', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
