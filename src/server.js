import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { json } from './middlewares/json.js'
import { Database } from './database.js'

const database = new Database()

const server = http.createServer(async (request, response)=>{
  const { method, url } = request

  await json(request, response)

  if( method === 'GET' && url === '/users'){
    const users = database.select('users')

    return response.end(JSON.stringify(users, null, 2))
  }

  if( method === 'POST' && url === '/users'){
    const {name, email} = request.body 
    
    const user = {
      id: randomUUID(),
      name: name,
      email: email
    }

    database.insert('users', user)

    return response
    .writeHead(201)
    .end('Criação de usuários')
  }

  if( method === 'PATCH' && url === '/users'){
    return response.end('Edição de usuários')
  }

  return response.writeHead(201).end('Resource not found')
})

server.listen(3333)