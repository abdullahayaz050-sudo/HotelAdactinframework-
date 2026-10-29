import { randomUUID } from 'node:crypto';
import { ApiService } from './api-service.js';

export class UserService extends ApiService {
  constructor(request, auth = null) {
    super(request);
    this.auth = auth;
    this.baseUrl = '/users';
  }

  createUserData() {
    const id = randomUUID().replaceAll('-', '');
    return {
      fullname: `Abdullah Ayaz ${id}`,
      email: `abdullah-${id}@example.com`,
      username: `abdullah_${id}`,
      password: 'Password123!'
    };
  }

  async register(user = this.createUserData()) {
    return this.post(`${this.baseUrl}/register`, { data: user });
  }

  async getAllUsers() {
    return this.get(`${this.baseUrl}/all-users`);
  }

  async getInvalidEndpoint() {
    return this.get(`${this.baseUrl}/invalid-endpoint-999`);
  }

  async postAllUsers(data) {
    return this.post(`${this.baseUrl}/all-users`, { data });
  }

  async update(user) {
    return this.put(`${this.baseUrl}/replace-account`, {
      data: user,
      headers: this.auth?.headers()
    });
  }

  async delete() {
    return this.deleteRequest(`${this.baseUrl}/delete-account`, {
      headers: this.auth?.headers()
    });
  }

  async invalidUpdateEndpoint(user) {
    return this.put(`${this.baseUrl}/invalid-replace-endpoint`, { data: user });
  }

  async invalidDeleteEndpoint() {
    return this.deleteRequest(`${this.baseUrl}/invalid-delete-endpoint`);
  }
}
