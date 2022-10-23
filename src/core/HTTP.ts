const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
}

export class HTTP {
    public static baseUrl = 'https://ya-praktikum.tech/api/v2/';

    static get(url: string, options = {}){
        return this.request(url, {...options, method: METHODS.GET})
    }

    static put(url: string, options = {}){
        return this.request(url, {...options, method: METHODS.PUT})
    }

    static post(url: string, options = {}){
        return this.request(url, {...options, method: METHODS.POST})
    }

    static delete(url: string, options = {}){
        return this.request(url, {...options, method: METHODS.DELETE})
    }

    static request(url: string, options: { method: any, data?: any }){
        
        const {method, data} = options
        return new Promise((resolve, reject) => {

            let xhrTimeout: number | undefined;

            const xhr = new XMLHttpRequest()
            xhr.withCredentials = true;

            url = this.baseUrl + url
            xhr.open(method, url)

            let headers = { 'Content-Type': 'application/json' }

            Object.entries(headers).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
            });

            xhr.onload = function () {
            if (xhrTimeout) {
                clearTimeout(xhrTimeout);
            }

            let response = xhr.response;

            const responseHeaders: any = {};
                xhr
                    .getAllResponseHeaders()
                    .trim()
                    .split(/[\r\n]+/)
                    .forEach((line) => {
                        const parts = line.split(': ');
                        const header = parts.shift() as string;
                        const value = parts.join(': ');
                        responseHeaders[header] = value;
                    });

                if (response.length > 0 && responseHeaders['content-type'].includes('application/json')) {
                    response = JSON.parse(response);
                }

                resolve({
                    response,
                    status: xhr.status,
                    responseHeaders,
                });
        };

        xhr.onabort = reject;
        xhr.onerror = reject;
        xhr.ontimeout = reject;

        if (method === METHODS.GET || !data) {
            xhr.send();
        } else if (data) {
            xhr.send(data);
        } else {
            xhr.send(JSON.stringify(data));
        }
        });
    }
}