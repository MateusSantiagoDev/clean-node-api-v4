import { AccountModel } from '../domain/model/account'
import { AddAccountModel } from '../domain/usecase/add-account'

export interface AddAccountRepository {
  add (account: AddAccountModel): Promise<AccountModel>
}
