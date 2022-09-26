import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  saveData(nombre : string, valor : any) {

    sessionStorage.setItem(nombre, JSON.stringify(valor));
  }

  getData(nombre: string) {
    return  JSON.parse(sessionStorage.getItem(nombre)!);
  }

  removeData(nombre: string) {
    sessionStorage.removeItem(nombre);
  }
}
