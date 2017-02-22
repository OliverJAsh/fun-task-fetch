import Task from 'fun-task'

const createComputation = (url, options) => (onSuccess, onFailure) => {
    const xhr = new XMLHttpRequest();
    const { method } = options;

    // Handlers
    // https://github.com/github/fetch/blob/49e80307b832ee4e49631ac3ea58cd8ed3cfef67/fetch.js#L421

    xhr.onload = () => {
        const options = {
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders() || '',
        };
        const body = 'response' in xhr ? xhr.response : xhr.responseText
        onSuccess({ body, options })
    }

    xhr.onerror = function() {
        onFailure(new TypeError('Network request failed'))
    }

    xhr.ontimeout = function() {
        onFailure(new TypeError('Network request failed'))
    }

    xhr.open(method, url, true);

    xhr.send();

    return () => {
        // cancellation logic
        xhr.abort();
    }
}

const cancellableFetch = (url, options) => {
    const computation = createComputation(url, options);
    return Task.create(computation)
}

export default cancellableFetch;
