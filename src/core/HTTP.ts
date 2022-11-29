export const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
}

export type Response<T> = {
    response: T
}

export class HTTP {
    public static baseUrl = 'https://ya-praktikum.tech/api/v2/';

    static get<T>(url: string, options = {}): Response<T> | PromiseLike<Response<T>>{
        return this.request(url, {...options, method: METHODS.GET})
    }

    static put<T>(url: string, options = {}): Response<T> | PromiseLike<Response<T>>{
        return this.request(url, {...options, method: METHODS.PUT})
    }

    static post<T>(url: string, options = {}): Response<T> | PromiseLike<Response<T>>{
        return this.request(url, {...options, method: METHODS.POST})
    }

    static delete<T>(url: string, options = {}): Response<T> | PromiseLike<Response<T>>{
        return this.request(url, {...options, method: METHODS.DELETE})
    }

    static request<T>(url: string, options: { method: any, data?: any }): Response<T> | PromiseLike<Response<T>>{
        
        const {method, data} = options

        return new Promise((resolve, reject) => {

            let xhrTimeout: number | undefined;

            const xhr = new XMLHttpRequest()
            xhr.withCredentials = true;

            url = this.baseUrl + url
            xhr.open(method, url)

            xhr.withCredentials = true
            
            if(!(data instanceof FormData)){
                let headers = { 
                    'Content-Type': 'application/json'
                }

                Object.entries(headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value);
                });
            }

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

                resolve({ response });
        };

        xhr.onabort = reject;
        xhr.onerror = reject;
        xhr.ontimeout = reject;

        if (method === METHODS.GET || !data) {
            xhr.send();
        } else if (data instanceof FormData) {
            xhr.send(data);
        } else {
            xhr.send(JSON.stringify(data));
        }
        });
    }
}