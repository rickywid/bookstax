export class HttpClient {
  makeRequest = async (request) => {
    const response = await fetch(request);
    if (!response.ok && response.type) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data || {};
  }

  get(endpoint, headers = {}) {
    const request = new Request(endpoint, {
      body: null,
      credentials: 'include',
      headers,
      method: 'GET',
      mode: 'cors',
    });

    return this.makeRequest(request);
  }

  post(endpoint, headers = {}, body = {}) {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      credentials: 'include',
      headers,
      method: 'POST',
      mode: 'cors',
    });

    return this.makeRequest(request);
  }

  put(endpoint, headers = {}, body = {}) {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: 'PUT',
      mode: 'cors',
    });

    return this.makeRequest(request);
  }

  delete(endpoint, headers = {}, body = {}) {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: 'DELETE',
      mode: 'cors',
    });

    return this.makeRequest(request);
  }
}

export default HttpClient;
