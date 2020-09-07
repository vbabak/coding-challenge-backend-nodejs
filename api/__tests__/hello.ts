import { hello } from '../src/hello'

describe('hello', () => {
  it('greets', () => {
    const actual = hello('Name')
    expect(actual).toEqual('Hello, Name!')
  })

  it('does basic math', async () => {
    expect(1).toBeGreaterThan(0)
    await expect(Promise.resolve(2)).resolves.toBeGreaterThan(1)
  })
})
