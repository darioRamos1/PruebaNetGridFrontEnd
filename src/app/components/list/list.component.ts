import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Carta } from 'src/app/models/Carta';

import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
 listCartas : Carta [] = [];
 closeResult?: string;

  constructor(private _cartaService: CartaService,
              private modalService: NgbModal,
              private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.obtenerCartas();

  }

  obtenerCartas(){

    this._cartaService.getAll().subscribe(data => {

      this.listCartas = data;
    },
    error => {
      console.log(error);
  })
  }

  open(content: any, carta: Carta) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result=='Aceptar')
      this.eliminarCarta(carta.id)
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  eliminarCarta(id: any){
    this._cartaService.deleteCarta(id).subscribe(data => {
      this.toastr.success('El producto fue eliminado con exito!', 'Producto Eliminado!');
      this.obtenerCartas();
    },
    error => {
      console.log(error);
    })
  }
}
