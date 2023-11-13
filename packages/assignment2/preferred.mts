// Improvement: Create handler function to take care of
// timeout, loading, http codes and errors
// I usually use Axios for backend and React Query for frontend 

export const fetchMovies = async () => {
  const controller = new AbortController()
  // Timeouts after 5 seconds
  setTimeout(() => controller.abort(), 5000)

  const urls = [
    { url: 'https://jsonplaceholder.typicode.com/posts/1' },
    { url: 'https://jsonplaceholder.typicode.com/posts/2' },
    { url: 'https://jsonplaceholder.typicode.com/posts/3' }
  ]

  const requests = urls.map(({ url }) =>
    fetch(url, { signal: controller.signal })
  )

  try {
    const res = await Promise.all(requests)
    const data = await Promise.all(res.map(r => r.json()))
    return data
  } catch {
    throw Error("fetchMovies failed")
  }
}
