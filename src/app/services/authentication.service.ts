import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {

  url: string ='http://localhost:3000/auth/v1';
  constructor(private httpcli: HttpClient) {

  }

  authenticateUser(data) {
    console.log(data);
    return this.httpcli.post(this.url, data);
  }

  setBearerToken(token) {
    sessionStorage.setItem('mytoken', token);
  }

  getBearerToken() {
  let tok =sessionStorage.getItem('mytoken');
  return tok;
  }

  isUserAuthenticated(token): Promise<boolean> {
    return   this.httpcli.post('http://localhost:3000/auth/v1/isAuthenticated',
     {},
     {
       headers: new HttpHeaders().set('Authorization' ,`Bearer ${token}`)
     }).map(
        (res) =>{ 
        return (res["isAuthenticated"]);
        }
     ).toPromise();
  }
}
