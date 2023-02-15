import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingParamError } from '../../error/missing-param-error'
import { badRequest } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { InvalidParamError } from '../../error/invalid-param-error'
import { EmailValidator } from '../../protocols/email-validator'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
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
    const invalid = this.emailValidator.isValid('email')
    if (!invalid) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
