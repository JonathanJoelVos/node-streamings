import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRouterPath } from './utils/build-router-path.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRouterPath('/users'),
        handler: (req, res) => {
            const {search} = req.query

            const users = database.select('users', search ? {
                name: search,
                email: search
            } : null)

            return res
            .end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRouterPath('/users'),
        handler: (req, res) => {
            console.log('tentou')
            const {name, email} = req.body

            const users = {
                id: randomUUID(),
                name,
                email
            }

            database.insert('users', users)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRouterPath('/users/:id'),
        handler: (req, res) => {
            const {id} = req.params

            const {name, email} = req.body

            database.update('users', id,{
                name,
                email
            })

            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRouterPath('/users/:id'),
        handler: (req, res) => {
            const {id} = req.params

            database.delete('users', id)

            return res.writeHead(204).end()
        }
    }
]