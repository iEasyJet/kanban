class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.json());
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

  createBoard() {
    return fetch(`${this.baseUrl}/boards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        'Content-Type': 'application/json',
      },
    }).then(this._parseResponse);
  }

  getAllBoards() {
    return fetch(`${this.baseUrl}/boards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        'Content-Type': 'application/json',
      },
    }).then(this._parseResponse);
  }

  updatePositionsBoards(boards) {
    return fetch(`${this.baseUrl}/boards`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(boards),
    }).then(this._parseResponse);
  }

  getOneBoard(boardId) {
    return fetch(`${this.baseUrl}/boards/${boardId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        'Content-Type': 'application/json',
      },
    }).then(this._parseResponse);
  }

  updateBoard(boardId, params) {
    return fetch(`${this.baseUrl}/boards/${boardId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then(this._parseResponse);
  }
}

const baseUrl = 'http://localhost:3001/api/v1';

const api = new Api(baseUrl);

export default api;
