import { DbAccount } from './db-add-account'
import { Encrypter } from '../../protocols/encrypter'

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hash_password'))
    }
  }
  return new EncrypterStub()
}

interface sutTypes {
  sut: DbAccount
  encrypterStub: Encrypter
}

const makeSut = (): sutTypes => {
  const encrypterStub = makeEncrypterStub()
  const sut = new DbAccount(encrypterStub)
  return {
    sut,
    encrypterStub
  }
}

describe('DbAccount Usecase', () => {
// teste para chamar o encrypter e garantir a cryptograpfia
  test('Should call Encypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const hashedSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'any_name',
      email: 'any_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(hashedSpy).toHaveBeenCalledWith('valid_password')
  })

  // teste para garantir q se houver alguma excessão será repassada..
  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})
