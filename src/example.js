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
