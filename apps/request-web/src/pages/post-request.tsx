import Head from 'next/head';
import { useRouter } from 'next/router';

import LayoutTemplate from '../components/layout/LayoutTemplate';

export default function PostRequest() {
  const router = useRouter();

  return (
    <LayoutTemplate>
      <Head>
        <title>두디스 | 요청</title>
      </Head>
      <section></section>
    </LayoutTemplate>
  );
}
