import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  constructor(private _LoginService: LoginService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,

    ) {

    this.userForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }


  ngOnInit(): void {
  }


  logguear(){
    const user = this.userForm.value;
    console.log(user);
   if( this._LoginService.login(user))
    {
    this.toastr.success('Bienvenido', 'Login');
    this.router.navigate(['/']);
    

    }else{
      this.toastr.error('Usuario o contraseña incorrectos', 'Login');
    }

  }

}
