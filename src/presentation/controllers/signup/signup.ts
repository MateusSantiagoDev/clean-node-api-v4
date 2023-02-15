import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingParamError } from '../../error/missing-param-error'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { InvalidParamError } from '../../error/invalid-param-error'
import { EmailValidator } from '../../protocols/email-validator'
import { AddAccount } from '../../../data/domain/usecase/add-account'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addaccount: AddAccount
  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addaccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmPassword']

      // verificar se esta faltando algum campo
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      // verificar se password e consfirmPassword são diferentes
      if (httpRequest.body.password !== httpRequest.body.confirmPassword) {
        return badRequest(new InvalidParamError('confirmPassword'))
      }

      // verificar se o email é invalido
      const invalid = this.emailValidator.isValid(httpRequest.body.email)
      if (!invalid) {
        return badRequest(new InvalidParamError('email'))
      }

      const response = await this.addaccount.add({
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      })
      return ok(response)
    } catch (err) {
      return serverError()
    }
  }
}
