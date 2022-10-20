import 'reflect-metadata';
import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { TestResolver } from './resolvers/TestResolver';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';


const main = async () => {
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TestResolver],
            validate: false,
        }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    })
    
    await apolloServer.start();
    const app : Express = express();

    apolloServer.applyMiddleware({ app });
    app.get('/', (_req, res) => {
        res.send('Hello World!');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}
main().catch(err => console.log(err))