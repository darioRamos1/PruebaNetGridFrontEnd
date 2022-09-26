import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Carta } from '../models/Carta';

@Injectable({
  providedIn: 'root'
})
export class CartaService {

  constructor(private http: HttpClient) {
   }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  postCarta(carta: Carta): Observable<any>{
    return this.http.post(baseUrl, carta);
  }

  getOne(id: string): Observable<any>{
    return this.http.get(baseUrl+'/' +id);
  }

  putCarta(id: string, producto: Carta): Observable<any>{
    return this.http.put(baseUrl+ '/' +id, producto);
  }

  deleteCarta(id: string): Observable<any>{
    return this.http.delete(baseUrl+'/'+ id);
  }
}
