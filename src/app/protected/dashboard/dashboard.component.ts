import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
  * {
    margin:15px
  }
  `
  ]
})
export class DashboardComponent implements OnInit {

  formulario  : FormGroup= this.fb.group({
    nombre:[,[Validators.required,Validators.maxLength(3)]],
    password:[,[Validators.min(0)]],
    // existencias:[,[Validators.min(0)]]

  })

  get usuario(){

    return this.authService.usuario;
  }

  constructor(private router:Router,private authService:AuthService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  logout(){
    this.router.navigateByUrl('/auth');
    this.authService.logout();

  }
  guardar(){
    Swal.fire('Error','hola','error')
  }
}
