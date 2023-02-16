import request from 'supertest'
import app from '../config/app'

describe('Content type Middlewares', () => {
  // teste para garantir que o retorno default das
  // rotas da aplicação serão json
  test('Should return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })
    await request(app)
      .get('/test_content_type')
      // espero que o content-type seja do tipo json
      .expect('content-type', /json/)
  })
  // se caso forçar um retorno xml ele vai retornar um xml
  test('Should return xml content type when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml') // forçando o retorno xml
      res.send('')
    })
    await request(app)
      .get('/test_content_type_xml')
      // espero que o content-type seja do tipo xml
      .expect('content-type', /xml/)
  })
})
