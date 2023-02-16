import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('SignUp Routes', () => {
  // usando o recurso do jest para conectar antes de cada teste
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  // usando o recurso do jest para desconectar depois de cada teste
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  // usando o recurso do jest para limpar as tabelas logo após cada teste
  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  // testar o caso de sucesso no retorno das rotas
  test('Should return an account on success', async () => {
    // não é necessario criar rota de teste pq ja existe
    // no signup-routes.ts
    await request(app)
      .post('/api/signup')
      .send({
        name: 'mateus santiago',
        email: 'mateus_santiago2.3@outlook.com',
        password: '1234',
        confirmPassword: '1234'
      })
      .expect(200)
  })
})
