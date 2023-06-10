import Image from 'next/image';

export default function Page5() {
  const Block = ({
    title,
    desc,
    src,
  }: {
    title: string;
    desc: string;
    src: string;
  }) => {
    return (
      <div>
        <div>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>

        <Image src={`images/landing/${src}.png`} alt={''} />
      </div>
    );
  };

  return (
    <div>
      <h3>test</h3>
      <div>
        <Block title={'test1'} desc={'test1'} src={'page4_1'} />
        <Block title={'test2'} desc={'test3'} src={'page4_2'} />
        <Block title={'test3'} desc={'test3'} src={'page4_3'} />
      </div>
      <button>test</button>
    </div>
  );
}
