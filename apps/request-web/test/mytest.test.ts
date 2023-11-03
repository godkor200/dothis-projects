import superjson from 'superjson';

test('aaa', () => {
  const s = superjson.stringify({
    a: BigInt(10),
  });

  console.log(s);
});
