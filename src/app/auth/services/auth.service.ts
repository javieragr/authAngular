import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import {catchError, map, tap} from 'rxjs/operators'
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //localhost:4000/api/auth/
  private baseUrl: string = environment.baseUrl;
  private _usuario?:Usuario;
  get usuario(){
    return {...this._usuario}
  }

  constructor(private http:HttpClient) { }

  registrar (name:string,email:string,password:string){
    const newUser ={
        name,
        email,
        password
    }
    const url =`${this.baseUrl}/auth/new`;
    return this.http.post<Usuario>(url,newUser)
              .pipe(
                tap(resp=>{
                  console.log(resp);
                  localStorage.removeItem('token');
                  localStorage.setItem('token',resp.token!)
                  
                }),
                map(m=> m),
                catchError(err=>of(err))
              )


  }

  login(email:string,password:string){
    const url =`${this.baseUrl}/auth`;
    const body ={email,password}
    return this.http.post<AuthResponse>(url,body)
    .pipe(
      tap(resp=>{
        console.log(resp);
        
        if (resp.ok) {
          localStorage.setItem('token',resp.token!)
          this._usuario={
            name:resp.name!,
            uid:resp.uid!,
            email:resp.email!
            
          }
        }
      }),
      map(resp=>resp.ok),
      catchError(err=>of(err.error.msg))
      //con el off convertimos el valor a observable
    )

  }


validarToken():Observable<boolean>{
  const url =`${this.baseUrl}/auth/renew`;
  const headers = new HttpHeaders()//{'x-token':localStorage.getItem('token')}
    .set('x-token',localStorage.getItem('token')|| '')
  return this.http.post<AuthResponse>(url,{},{headers:headers})
  .pipe(
    map(resp=>{ 
      if (resp.ok) {
        localStorage.setItem('token',resp.token!)
     
          this._usuario={
            name:resp.name!,
            uid:resp.uid!,
            email:resp.email!
            
          }
      }
      
      return resp.ok
    }),
    catchError(err => of(false))
  )
}

logout(){
localStorage.removeItem('token');
//localStorage.clear(); // borra todo de nuestra app

}

}
