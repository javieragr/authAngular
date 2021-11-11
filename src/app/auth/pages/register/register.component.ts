import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup= this.fb.group({
    name:['',[Validators.required,Validators.minLength(6)]],
    email:['',[Validators.required,Validators.email,Validators.minLength(6)]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })

  constructor(private fb:FormBuilder,private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
  }
  registro(){
    console.log(this.miFormulario.value);
    
    console.log(this.miFormulario.invalid);
    const {name,email,password}= this.miFormulario.value;
    this.authService.registrar(name,email,password).subscribe(resp =>{
      if (resp.ok) {
        this.miFormulario.reset();
        Swal.fire('tittle','medio','success')
        this.router.navigateByUrl('/dashboard')
      }else{
        Swal.fire('tittle','medio','error')
      }
      

    })
    
    //this.router.navigateByUrl('/dashboard')
    
  }
}
