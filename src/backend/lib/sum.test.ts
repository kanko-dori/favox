import { sum } from './sum'

test('1 + 2 = 3', () => {
    expect(sum(1,2)).toBe(3)
})

test('0 + 0 = 0', () => {
    expect(sum(0, 0)).toBe(0)
})