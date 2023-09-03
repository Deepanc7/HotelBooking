import { Injectable } from '@angular/core';
import { User } from '../user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor() { }


  private users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }
}
