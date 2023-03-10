import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

describe('Account Mongo Repository', () => {
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

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }
  // sucesso na integração com o mongodb
  test('Should return and account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email')
    expect(account.password).toBe('any_password')
  })
})
