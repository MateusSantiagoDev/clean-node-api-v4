interface HttpResponse {
  statusCode: number
  body: any
}

interface HttpRequest {
  body: any
}

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: new Error('missing param error')
    }
  }
}

describe('SignUp Controller', () => {
  // verificar se o campo nome foi enviado
  test('Should return 400 if no name id provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('missing param error'))
  })
})
