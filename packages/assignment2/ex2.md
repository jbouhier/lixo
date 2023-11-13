# Exercice 2

- Do a code review, add comments to the existing code
- Make it work
- Write your preferred solution

```typescript
var urls = [
  { url: 'https://jsonplaceholder.typicode.com/posts/1' },
  { url: 'https://jsonplaceholder.typicode.com/posts/2' },
  { url: 'https://jsonplaceholder.typicode.com/posts/3' }
];

// 'i' is a variable. It needs to be declared this way: let i = 0
// Since arrays index starts at 0, the condition will make the loop go out of bounds by 1
// To fix that, let's change it to: i < urls.length
for (i = 0; i <= urls.length; i++) {
  // 'response' should be declared. We can use a constant instead of a
  // variable since it is redeclared at every iteration of the loop
  // --> const response = fetch(urls[i])

  // fetch() takes a URL string as 1st parameter, since we're iterating
  // on a list of object with 'url' parameter, we need to add '.url' after 'urls[i]'
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  // --> const response = fetch(urls[i].url)


  // fetch() returns a Promise that resolves to a Response object
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch#return_value
  // We need to use the keyword 'await' to wait this async operation to finish
  // before we can continue. For that, we need to first warp the code in a async
  // function to be able to use the 'await' keyword 
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
  // --> const response = await fetch(urls[i].url) 
  // --> Wrap evertything in: async const fetchMovies = () => { <code goes here> }
  response = fetch(urls[i]);

  // Here the response object will replace the url and we want a list of posts
  // For that we need to extract the json, which is another async operation
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/json_static
  // --> urls[i] = await response.json()
  urls[i] = response;

  // Now that we have a list of json posts, we can either return
  // it or store it with a state management library like Effector ☄️ or Zustand 🐻
  // P.S: Redux is outdated https://fe-tool.com/awesome-react-state-management 
}

// should display a list of posts
console.log(urls);
```
