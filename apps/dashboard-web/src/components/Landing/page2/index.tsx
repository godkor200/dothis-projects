import Image from 'next/image';

export default function Page2() {
  return (
    <div>
      <Image src={'images/landing/page2.png'} alt={''} />
      <div>
        <h2>test text</h2>
        <p>test text</p>
        <button>button</button>
      </div>
    </div>
  );
}
