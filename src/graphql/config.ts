import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';

const authLink = setContext((_: unknown, { headers }) => {
    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null,
        }
    }
});

const httpUri = process.env.NODE_ENV === 'production' ? 'https://yatzer-backend.herokuapp.com/graphql' : 'https://localhost:8000/graphql';
const wsUri = process.env.NODE_ENV === 'production' ? 'wss://yatzer-backend.herokuapp.com/graphql' : 'wss://localhost:8000/graphql';

const httpLink = createUploadLink({
    uri: httpUri
});

const webSocketLink = new WebSocketLink({
    uri: wsUri,
    options: {
        reconnect: true,
        timeout: 20000,
        lazy: true,
        connectionParams: {
            token: localStorage.getItem('token')
        }
    },
});

const splitLink = split(({ query }) => {
    const definition = getMainDefinition(query);
    return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
},  webSocketLink, authLink.concat(httpLink as any) as any);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
});

export default client;