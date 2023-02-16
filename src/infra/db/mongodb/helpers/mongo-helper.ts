import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  // variável que sera usada nos métodos
  Client: null as MongoClient,

  // método para conectar
  async connect (url: string) {
    this.Client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  // método para desconectar
  async disconnect () {
    await this.Client.close()
  },

  // método que ira acessar uma collection para ser usada nos testes
  getCollection (name: string): Collection {
    return this.Client.db().collection(name)
  }
}
