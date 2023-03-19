import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }
  addEmployee(data:any):Observable<any>{
    return this._http.post('https://chix728.github.io/crud-app/employee',data)
  }
  getEmployees():Observable<any>{
    return this._http.get('https://chix728.github.io/crud-app/employee')
  }
  updateEmployee(id:number,data:any):Observable<any>{
    return this._http.put(`https://chix728.github.io/crud-app/employee/${id}`,data);
  }
  deleteemployee(id:number):Observable<any>{
    return this._http.delete(`https://chix728.github.io/crud-app/employee/${id}`);
  }
}
