import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePatch } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePatch('/users'),
    handler: (req, res) => {
      
      const { search } = req.query

      const users = database.select('users', search ? {
        name: search,
        email: search
      }: null)

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePatch('/users'),
    handler: (req, res) => {
       const {name, email} = req.body 
    
    const user = {
      id: randomUUID(),
      name: name,
      email: email
    }

    database.insert('users', user)

    return res
    .writeHead(201)
    .end('Criação de usuários')
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePatch('/users/:id'),
    handler: (request, response) => {
    const { id } = request.params 
    
    database.delete('users', id)

    return response
    .writeHead(204)
    .end('Usuário deletado')
    }
  },
  {
    method: 'PUT',
    path: buildRoutePatch('/users/:id'),
    handler: (request, response) => {
    const { id } = request.params 
    const { name, email } = request.body 
    
    database.update('users', id, {
      name,
      email
    })

    return response
    .writeHead(204)
    .end('Usuário deletado')
    }
  }
  
]