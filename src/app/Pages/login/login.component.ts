import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario, UsuarioValidadoResponse } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  forma!: FormGroup;
  mostrarPassword: boolean = false;
  errorMessage: string = ''; 
  Alert: boolean = false;
  usuarioResponse : UsuarioValidadoResponse[] = [];
  constructor(
    private fb: FormBuilder, 
    private usuarioService: UsuarioService, 
    private router: Router,
    private cookieService: CookieService
  ) {
    this.crearFormulario();
  }
  guardarIdUsuarioEnCookie(id: number) {
    this.cookieService.set('userId', id.toString());
  }
  crearFormulario() {
    this.forma = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  entrar() {
    if (this.forma.valid) {
      const email = this.forma.get('email')?.value;
      const password = this.forma.get('password')?.value;
  
      // Llamar al servicio para validar el usuario
      this.usuarioService.validarUsuario(email, password).subscribe(
        (response: any) => {
          // Aquí dentro es donde manejas la respuesta del servidor
          if (response) {
            const usuarioValidado = response.usuario; // Accede al objeto usuario dentro de la respuesta
          console.log('Usuario Validado:', usuarioValidado); 
          console.log('Nombre:', usuarioValidado.Nombre); 
          console.log('Rol:', usuarioValidado.Rol); 
          console.log('Apellido Paterno:', usuarioValidado.Apellido_Paterno); 
          console.log('Apellido Materno:', usuarioValidado.Apellido_Materno); 
        console.log('Email:', usuarioValidado.Email); 

        this.guardarIdUsuarioEnCookie(usuarioValidado.ID_Usuario);
  
            // Acceder al nombre del usuario y redirigir según su rol
            console.log('Usuario Validado:', usuarioValidado.Nombre);
            switch (usuarioValidado.Rol) {
              case 'Agricultor':
                this.router.navigate(['/navbar/cultivos']);
                break;
              case 'Editor':
                this.router.navigate(['/editor-nav/todos-los-cultivos']);
                break;
              case 'Administrador':
                this.router.navigate(['/super-admin-nav/climas']);
                break;
              default:
                this.router.navigate(['/']);
                break;
            }
          } else {
            // Si no se encuentra el usuario
            this.errorMessage = 'El correo o Contraseña no son validos';
            this.Alert = true;
          }
        },
        error => {
          // Manejar errores de la petición al servidor
          console.error('Error al validar usuario', error);
          this.errorMessage = 'El correo o Contraseña no son validos';
          this.Alert = true;
        }
      );
    } else {
      // Si el formulario no es válido
      this.forma.markAllAsTouched();
    }
  }

}