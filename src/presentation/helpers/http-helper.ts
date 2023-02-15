import { ServerError } from '../error/server-error'
import { HttpResponse } from '../protocols/http'

export const badRequest = (err: Error): HttpResponse => ({
  statusCode: 400,
  body: err
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})
