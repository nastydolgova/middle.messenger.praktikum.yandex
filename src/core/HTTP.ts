const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
}

export class HTTPTransport {
    get = (url: string, options = {}) => {
        return this.request(url, {...options, method: METHODS.GET})
    }

    put = (url: string, options = {}) => {
        return this.request(url, {...options, method: METHODS.PUT})
    }

    post = (url: string, options = {}) => {
        return this.request(url, {...options, method: METHODS.POST})
    }

    delete = (url: string, options = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE})
    }

    request = (url: string, options: { method: any, data?: any }) => {
        const {method, data} = options
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.open(method, url)

            xhr.onload = function() {
                resolve(xhr)
            }

            xhr.ontimeout = reject
            xhr.onabort = reject
            xhr.onerror = reject

            if(method === 'GET' || !data) {
                xhr.send()
            } else {    
                xhr.send(data)  
            }
        })
    }
}