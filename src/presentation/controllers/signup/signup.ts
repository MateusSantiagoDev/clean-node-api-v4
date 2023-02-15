import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingParamError } from '../../error/missing-param-error'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'confirmPassword']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new MissingParamError(field)
        }
      }
    }
  }
}
