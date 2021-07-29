import Head from 'next/head';
import { Typography } from 'antd';
import { ROUTES } from '../constants';

const { Title } = Typography;

export default function Popular() {
  const pageName = ROUTES.POPULAR.name;

  return (
    <div className={''}>
      <Head>
        <title>{pageName}</title>
        <meta name="description" content="Generated by create next app" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Title>{pageName}</Title>
    </div>
  );
}