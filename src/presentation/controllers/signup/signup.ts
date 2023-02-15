import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingParamError } from '../../error/missing-param-error'
import { badRequest } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'

export class SignUpController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'email', 'password', 'confirmPassword']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    if (httpRequest.body.password !== httpRequest.body.confirmPassword) {
      return {
        statusCode: 400,
        body: 'invalid_password'
      }
    }
  }
}
