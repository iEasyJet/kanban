class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(`Произошла ошибка со статус-кодом ${res.status}`)
    );
  }

  _getToken() {
    return localStorage.getItem('token');
  }

  signup(params) {
    return fetch(`${this.baseUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then(this._parseResponse);
  }

  login(params) {
    return fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then(this._parseResponse);
  }

  verifyToken() {
    return fetch(`${this.baseUrl}/auth/verify-token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        'Content-Type': 'application/json',
      },
    }).then(this._parseResponse);
  }
}

const baseUrl = 'http://localhost:3001/api/v1';

const api = new Api(baseUrl);

export default api;
