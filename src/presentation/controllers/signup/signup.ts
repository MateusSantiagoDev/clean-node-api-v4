import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../error'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

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

      // desestruturando o httpRequest.body
      const { email, password, confirmPassword } = httpRequest.body

      // verificar se password e consfirmPassword são diferentes
      if (password !== confirmPassword) {
        return badRequest(new InvalidParamError('confirmPassword'))
      }

      // verificar se o email é invalido
      const invalid = this.emailValidator.isValid(email)
      if (!invalid) {
        return badRequest(new InvalidParamError('email'))
      }

      // criando conta de usuário, retornando statusCode 200 e o body
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
