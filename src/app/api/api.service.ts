import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private BaseUrl: string = 'http://localhost:8080/authority/v1.0';
  constructor(private http: HttpClient) { }

//getAll
getAllRequest(page: number): Observable<any> {
  const url = this.BaseUrl +'/purchases'+ '?page=' + page + '&limit=20';
  return this.http.get(url);
}
// getOne
getOneRequest(id: any): Observable<any> {
  const url = `${this.BaseUrl}/purchases/${id}`;
  return this.http.get(url);
}
//post
postRequest(body: any): Observable<any> {
  const url = `${this.BaseUrl}/purchases`;
  return this.http.post(url, body);
}
// patch
patchRequest(id: any, body: any): Observable<any> {
  const url = `${this.BaseUrl}/purchases/${id}`;
  return this.http.patch(url, body);
}
// delete
deleteRequest(id: any): Observable<any> {
  const url = `${this.BaseUrl}/purchases/${id}`;
  return this.http.delete(url);
}

}
