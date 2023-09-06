import { Injectable } from '@angular/core';
import { User } from '../user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor() { }

  private users: User[] = [];

  checkUser(user: User) {
    let users:User[]=JSON.parse(localStorage.getItem('user_data') || '[]');
    for(let u of users){
    if (user.name===u.name) {
      return "name";
    }
    if (user.email===u.email) {
      return "email";
    }
  }
  return "proceed";
  }

  addUser(user: User) {
    this.users.push(user);
    localStorage.setItem('user_data', JSON.stringify(this.users));
  }

  getUserByEmail(email: string): User | undefined {
    let users:User[]=JSON.parse(localStorage.getItem('user_data') || '[]');
    return users.find(user => user.email === email);
  }
}
