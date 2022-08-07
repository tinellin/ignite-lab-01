import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function Home() {
  return <h1>Hello World!</h1>;
}

export const getServerSideProps = withPageAuthRequired();
