// arquivo que vai rodar o servidor
import express from 'express'

const app = express()
app.listen(5050, () => console.log('Server running at http://localhost:5050'))
