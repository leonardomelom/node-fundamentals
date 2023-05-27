import http from 'node:http'

const users = []

const server = http.createServer((request, response)=>{
  const { method, url } = request

  if( method === 'GET' && url === '/users'){
    return res
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users, null, 2))
  }

  if( method === 'POST' && url === '/users'){
    users.push({
      id: 1,
      name: 'Jhon Doe',
      email: 'jhondoe@example.com'
    })
    return res
    .writeHead(201)
    .end('Criação de usuários')
  }

  if( method === 'PATCH' && url === '/users'){
    return res.end('Edição de usuários')
  }

  return response.writeHead(201).end('Resource not found')
})

server.listen(3333)