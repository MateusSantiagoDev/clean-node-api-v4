import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  // testar o caso de sucesso no retorno das rotas
  test('Should return an account on success', async () => {
    // não é necessario criar rota de teste pq ja existe
    // no signup-routes.ts
    await request(app)
      .post('/api/signup')
      .send({
        name: 'mateus',
        email: 'mateus_santiago2.3@outlook.com',
        password: '1234',
        confirmPassword: '1234'
      })
      .expect(200)
  })
})
