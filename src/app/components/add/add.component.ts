import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Carta } from 'src/app/models/Carta';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  titulo = 'Crear Carta';
  cartaForm: FormGroup;
  id: string;

  constructor(
    private fb: FormBuilder,
    private _cartaService: CartaService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.cartaForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.id = this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarCarta() {
    const carta: Carta = {
      title: this.cartaForm.get('title')?.value,
      body: this.cartaForm.get('body')?.value,
      userId: 1,
    };
    if (this.id !== null) {
      this._cartaService.putCarta(this.id, carta).subscribe(data=> {
        this.toastr.info(
          'la carta actualizado con exito!',
          'carta actualizada!'
        );
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
        this.cartaForm.reset();
        this.toastr.error(
          'la carta no fue actualizado con exito!',
          'carta No Actualizada!'
        );
      });
    } else {
      this._cartaService.postCarta(carta).subscribe(
        (data) => {
          console.log(data);
          this.toastr.success('La carta fue creada con exito', 'Carta Creada');
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }

  esEditar() {
    if (this.id != null) {
      this.titulo = 'Editar Carta';
      this._cartaService.getOne(this.id).subscribe((data) => {
        this.cartaForm.setValue({
          title: data.title,
          body: data.body,
        });
      });
    }
  }
}
