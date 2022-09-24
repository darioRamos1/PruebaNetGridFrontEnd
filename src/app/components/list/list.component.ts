import { Component, OnInit } from '@angular/core';
import { Carta } from 'src/app/models/carta';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
 listCartas : Carta [] = [];
  constructor(private _cartaService: CartaService) { }

  ngOnInit(): void {
    this.obtenerCartas();
  }

  obtenerCartas(){
    this._cartaService.getAll().subscribe(data => {
      console.log(data);
      this.listCartas = data;
    },
    error => {
      console.log(error);
  })
  }

}
