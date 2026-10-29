import { ApiService } from './api-service.js';

export class AuthService extends ApiService {
  constructor(request) {
    super(request);
    this.token = null;
  }

  async login(user) {
    const response = await this.post('/users/login', { data: user });

    if (response.status() === 200) {
      const body = await response.json();
      this.token = body.token || body.accessToken || body.data?.token || null;
    }

    return response;
  }

  headers() {
    return this.token ? { Authorization: Bearer  } : undefined;
  }
}
