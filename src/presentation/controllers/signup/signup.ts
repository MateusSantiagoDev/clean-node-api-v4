import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingParamError } from '../../error/missing-param-error'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: new MissingParamError('name')
    }
  }
}
