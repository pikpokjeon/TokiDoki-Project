import { GraphQLServer, PubSub } from 'graphql-yoga'
import { resolver } from './graphql/resolver.js'
import { schema } from './graphql/schema.js'
import { log } from './lib.js'

const ps = new PubSub()

const options = {
    port: 8282,
    origin: '*',
    playground: '/playground',
    getEndpoint: true,
    debug: true,
}

const server = new GraphQLServer(
    {
        resolvers: resolver, typeDefs: schema, context: { pubsub: ps },
    }
)



const port = 8282
server.start(options, ({ port }) =>
{
    console.log(`server is running on port ${port}`)
})