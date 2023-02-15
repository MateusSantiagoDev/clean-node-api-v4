import { DbAccount } from './db-add-account'
import { Encrypter } from '../../protocols/encrypter'
import { AddAccountRepository } from '../../protocols/add-account-repository'
import { AccountModel } from '../../domain/model/account'
import { AddAccountModel } from '../../domain/usecase/add-account'

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hash_password'))
    }
  }
  return new EncrypterStub()
}

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_emaiil',
        password: 'valid_password'
      }
      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

interface sutTypes {
  sut: DbAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): sutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const encrypterStub = makeEncrypterStub()
  const sut = new DbAccount(encrypterStub, addAccountRepositoryStub)
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
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

  // teste para garantir que a conta do usuário seja criada
  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })
  })
})
