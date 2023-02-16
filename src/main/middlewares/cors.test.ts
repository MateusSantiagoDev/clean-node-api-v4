import request from 'supertest'
import app from '../config/app'

describe('CORS Middlewares', () => {
  // permitir que qualquer servidor possa acessar a api
  test('Should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_cors')
      // permitir o acesso de qualquer origem, metodo, header
      .expect('Access-Control-Allow-Origin', '*')
      .expect('Access-Control-Allow-Methods', '*')
      .expect('Access-Control-Allow-Headers', '*')
  })
})
