# fun-task fetch

[`fetch`](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) API implemented using the [`Task`
type](https://github.com/rpominov/fun-task), which [allows cancellation amongst
other things](https://github.com/rpominov/fun-task#what-is-a-task).

This is just a proof of concept and needs more work. Example:

``` js
import cancellableFetch from './index';

const url = 'https://jsonplaceholder.typicode.com/posts'
const task = cancellableFetch(url, { method: 'GET' })

const cancel = task.run({
    success(result) {
        console.log('success', { result })
    },
    failure(result) {
        console.log('failure', { result })
    }
})

setTimeout(cancel, 500)
```

## Development

```
yarn
yarn build
```
