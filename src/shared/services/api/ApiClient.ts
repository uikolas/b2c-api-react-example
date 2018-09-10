import {stringify} from 'query-string';

interface Request {
  url: string;
  method: string;
  params?: object;
  body?: object;
}

export default class ApiClient {
  public prefix: string;

  public get(requestUrl: string, params: object = {}) {
    return this.request({
      url: requestUrl,
      method: 'get',
      params,
    });
  }

  public put(requestUrl: string, payload: object = {}) {
    return this.request({
      url: requestUrl,
      method: 'put',
      body: payload,
    });
  }

  public patch(requestUrl: string, payload: object = {}) {
    return this.request({
      url: requestUrl,
      method: 'put',
      body: payload,
    });
  }

  public post(requestUrl: string, payload: object = {}) {
    return this.request({
      url: requestUrl,
      method: 'post',
      body: payload,
    });
  }

  public delete(requestUrl: string, params: any) {
    return this.request({
      url: requestUrl,
      method: 'delete',
      params,
    });
  }

  private request(request: Request) {
    const {url, method, params, body} = request;
    const headers = new Headers();
    headers.append('Accept', 'application/vnd.api+json' );
    headers.append('Content-Type', 'application/json' );

    const urlWithQuery = `${url}?${stringify(params)}`;

    const init: any = {
      method,
      mode: 'no-cors',
      headers,
    };

    if (method !== 'get' && method !== 'head') {
      init.body = JSON.stringify(body);
    }

    return fetch(`${urlWithQuery}`, init)
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data) {
          return data;
        }

        return Promise.reject(data.error);
      })
      .catch(err => {
        return err;
      });
  }
}
