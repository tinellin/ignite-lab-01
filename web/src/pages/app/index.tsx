import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { withApollo } from '../../lib/withApollo';
import { useMeQuery } from '../../graphql/generated/graphql';
import {
  getServerPageGetProducts,
  ssrGetProducts,
} from '../../graphql/generated/page';

function Home() {
  const { data: me } = useMeQuery();

  return (
    <>
      <h1>Hello World!</h1>
      <pre>ok: {JSON.stringify(me, null, 2)}</pre>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    // return getServerPageGetProducts({}, ctx);

    return {
      props: {},
    };
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
