import { SignUpController } from './signup'
import { MissingParamError } from '../../error/missing-param-error'

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
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
})
