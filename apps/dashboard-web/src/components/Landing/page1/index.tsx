import Image from 'next/image';

import { Search } from '@/assets';

import Topbar from './topbar';

export default function Page1() {
  return (
    <div>
      <Topbar />
      <div>
        <Image
          src="/images/landing/page1.png"
          width={500}
          height={500}
          alt={'page1 image'}
        />
        <h1>test text</h1>
        <p>text text</p>
        <div>
          <button>
            <Image src={'/images/landing/logo_small.png'} alt={'logo_small'} />
            <p>button</p>
          </button>
          <button>
            <Search />
            <p>button</p>
          </button>
        </div>
      </div>
    </div>
  );
}
