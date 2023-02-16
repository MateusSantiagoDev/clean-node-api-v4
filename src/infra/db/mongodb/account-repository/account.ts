import { AccountModel } from '../../../../data/domain/model/account'
import { AddAccountModel } from '../../../../data/domain/usecase/add-account'
import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    // criando uma collection local e nomeando de 'accounts'
    const accountCollection = MongoHelper.getCollection('accounts')
    // inserindo os dados na collection
    const result = await accountCollection.insertOne(accountData)
    const account = result.ops[0] // acessando os dados inseridos
    // desestruturando a varável para subistituir o id com undescore
    // por um id sem undescore
    const { _id, ...accountResults } = account
    const response = Object.assign({}, accountResults, { id: _id })
    return response
  }
}
