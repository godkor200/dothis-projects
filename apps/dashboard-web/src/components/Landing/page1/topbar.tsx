import Image from 'next/image';

export default function Topbar() {
  return (
    <div>
      <Image
        src={'/images/landing/logo_medium.png'}
        alt={'logo_medium'}
        width={100}
        height={100}
      />
      <div>
        <button>
          <Image src={'./content.svg'} alt={''} width={100} height={100} />{' '}
          <p>text</p>
        </button>
        <button>
          <Image src={'./magicpen.svg'} alt={''} width={100} height={100} />{' '}
          <p>text</p>
        </button>
        <button>
          <Image src={'./user.svg'} alt={''} width={100} height={100} />{' '}
          <p>text</p>
        </button>
        <button>
          <Image src={'./contact.svg'} alt={''} width={100} height={100} />{' '}
          <p>text</p>
        </button>
      </div>
    </div>
  );
}
