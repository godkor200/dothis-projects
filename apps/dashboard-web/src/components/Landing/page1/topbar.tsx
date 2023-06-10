import Image from 'next/image';

import { Contact, Magicpen, User } from '@/assets';

export default function Topbar() {
  return (
    <div>
      <Image src={'/images/landing/logo_medium.png'} alt={'logo_medium'} />
      <div>
        <button>
          <Contact /> <p>text</p>
        </button>
        <button>
          <Magicpen /> <p>text</p>
        </button>
        <button>
          <User /> <p>text</p>
        </button>
        <button>
          <Contact /> <p>text</p>
        </button>
      </div>
    </div>
  );
}
