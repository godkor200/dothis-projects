import Image from 'next/image';

export default function Page6() {
  return (
    <div>
      <Image
        src={'/images/landing/page6.png'}
        alt={''}
        width={100}
        height={100}
      />
      <h3>test text</h3>
      <button>
        <Image
          src={'/images/landing/logo_small.png'}
          alt={''}
          width={100}
          height={100}
        />
      </button>
    </div>
  );
}
