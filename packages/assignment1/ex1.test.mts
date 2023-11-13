import { describe, expect, it } from 'vitest'
import { findAvailableTable } from './ex1.mts'

describe('findAvailableTable', () => {
  it('does not have any match', () => {
    const input = [false, false, false]
    const test = findAvailableTable(input)
    expect(test).toEqual(-1)
  })

  it('match first occurence', () => {
    const input = [false, true, false, true]
    const test = findAvailableTable(input)
    expect(test).toEqual(1)
  })

  it('match first occurence at the end', () => {
    const input = [false, false, false, true]
    const test = findAvailableTable(input)
    expect(test).toEqual(3)
  })
})
