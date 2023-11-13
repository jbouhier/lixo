import { describe, expect, it } from 'vitest'
import { expected } from './expected.mjs'
import { fetchMovies } from './working.mts'

// TODO: Use Mock Service Worker to improve API tests 

describe('fetchMovies working', () => {
  it('should return a list of movies', async () => {
    const test = await fetchMovies()
    expect(test).toEqual(expected)
  }, 2000)
})
