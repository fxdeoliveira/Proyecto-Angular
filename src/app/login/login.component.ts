import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formulariologin: FormGroup
  datoscorrectos: boolean = true;
  textoerror: string = ''
  constructor(private creadordeFormulario: FormBuilder, public auth: AngularFireAuth,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formulariologin = this.creadordeFormulario.group({
      email:['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password:['', Validators.required]
    });
  }

  ingresar(){
    this.datoscorrectos = true;
    if(this.formulariologin.valid)
    {
      this.datoscorrectos=true;
      this.spinner.show();
      this.auth.auth.signInWithEmailAndPassword(this.formulariologin.value.email, this.formulariologin.value.password)
      .then((usuario)=>{
        console.log(usuario)
        this.spinner.hide();
      }).catch((error)=>{
        this.datoscorrectos = false;
        this.textoerror = error.message
        this.spinner.hide();
      })
    }
    else{
      this.datoscorrectos = false;
      this.textoerror = "Los datos no estan correctos.";
    }
   
  }

}
