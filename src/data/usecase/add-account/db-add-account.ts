import { AccountModel } from '../../domain/model/account'
import { AddAccountModel } from '../../domain/usecase/add-account'
import { AddAccountRepository } from '../../protocols/add-account-repository'
import { Encrypter } from '../../protocols/encrypter'

export class DbAccount implements AddAccountRepository {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository
  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return this.addAccountRepository.add(account)
  }
}
