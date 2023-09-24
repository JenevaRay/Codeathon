import dotenv from 'dotenv'
dotenv.config()

import Express from 'express'
import { ApolloServer } from 'apollo-server-express'
import path from 'path'
// import { AuthMiddleware } from './utils/auth'

import { typeDefs, resolvers } from './schemas'
import { db } from './config/connection'

const PORT = process.env.port || 3001
const app = Express()
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: authMiddleware
})

app.use(Express.urlencoded({ extended: false }))
app.use(Express.json())

app.use('/images', Express.static(path.join(__dirname, '../client/images')))

if (process.env.NODE_ENV === 'production') {
    app.use(Express.static(path.join(__dirname, '../client/build')))
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start()
    server.applyMiddleware({ app })

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`)
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
        })
    })
}

startApolloServer(typeDefs, resolvers)