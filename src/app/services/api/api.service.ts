import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverUrl = `http://localhost:4000/api`

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `${this.getToken()}`,
      authorization: `${this.getToken()}`,
    }),
  };

  constructor(private http: HttpClient) { }

  getOptionFn() {
    return this.httpOptions;
  }

  // get token from local storage
  getToken() {
    let val = localStorage.getItem("access_token");
    if (val) {
      return 'Bearer ' + val;
    } else {
      return false;
    }
  }

  // get all get api without auth
  getApiFn(endPoint: any): Observable<Object> {
    return this.http
      .get<Object>(this.serverUrl + endPoint, this.getOptionFn())
      .pipe(catchError(this.handleError))
  }
  postApiFn(endPoint: any, payload): Observable<Object> {
    return this.http
      .post<Object>(this.serverUrl + endPoint, payload, this.getOptionFn())
      .pipe(catchError(this.handleError))
  }


  handleError(error: any) {
    return throwError(error.error.error || "Server Error");
  }

}
