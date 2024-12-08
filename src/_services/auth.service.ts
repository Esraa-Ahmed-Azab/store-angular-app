import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    { username: 'admin', password: 'admin' },
    { username: 'user', password: 'user' },
  ];

  constructor() { }

  validateUser(username: string, password: string): boolean {
    return this.users.some(
      (user) => user.username === username && user.password === password
    );
  }
}
