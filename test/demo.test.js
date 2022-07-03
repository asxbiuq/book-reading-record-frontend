

test('foo snapshot test', () => {
  const bar = {
    foo: {
      x: 0,
      y: 2,
    },
  }
  expect(bar).toMatchSnapshot()
})
