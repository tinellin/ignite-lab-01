import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { GetServerSidePropsContext, NextPage } from 'next';

export type ApolloClientContext = GetServerSidePropsContext;

//HOC: High Order Component: De prog. funcional
//é uma função que recebe um COMPONENTE como parâmetro
//e retorna um componente "evoluído"
export const withPublicApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    return (
      //props.apolloState: variável na qual o próprio Apollo coloca o cache das infos
      <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
        <Component {...props} />
      </ApolloProvider>
    );
  };
};

export function getApolloClient(
  ctx?: ApolloClientContext,
  ssrCache?: NormalizedCacheObject
) {
  //Acessar a API back-end graphql
  const httpLink = createHttpLink({
    uri: 'http://localhost:3332/graphql',
    fetch,
  });

  const cache = new InMemoryCache().restore(ssrCache ?? {});

  return new ApolloClient({
    link: from([httpLink]),
    cache,
  });
}
