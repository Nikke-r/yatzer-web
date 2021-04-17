import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const authLink = setContext((_: unknown, { headers }) => {
    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null,
        }
    }
});

const httpLink = new HttpLink({ uri: 'https://yatzer-backend.herokuapp.com/graphql' });

const webSocketLink = new WebSocketLink({
    uri: 'wss://yatzer-backend.herokuapp.com/graphql',
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
    return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription')
},  webSocketLink, authLink.concat(httpLink as any) as any);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
});

export default client;