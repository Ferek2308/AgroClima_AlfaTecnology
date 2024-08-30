import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Usuario} from 'src/app/interfaces/interfaces';

import { UsuarioService} from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  // Declaración de variables
  mensaje: string = "Registro Exitoso";
  forma!: FormGroup;
  errorMessage!: String;
  mostrarPassword: boolean = false;
  contraseña: string = "";
  Alert: boolean = false;
  registroExitoso: boolean = false;

  // Constructor: inicializa el FormBuilder y los servicios necesarios
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
    private aRouter: ActivatedRoute,private router: Router) {
    this.crearFormulario();

}
  // Método OnInit, se ejecuta al iniciar el componente
  ngOnInit() {

  }
  // Función para mostrar u ocultar la contraseña
  mostrarContra() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  // Método para crear el formulario de registro
  crearFormulario() {
    this.forma = this.fb.group({
      Nombre: ["", Validators.required],
      Apellido_Paterno: ["", Validators.required],
      Apellido_Materno: ["", Validators.required],
      Email: ["", [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      Contraseña: ["", [Validators.required, Validators.minLength(7)]],
      Localidad: ["", Validators.required]
    })
  }

  // Método para validar y marcar los campos del formulario
  crear() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
  }

  // Método para guardar el registro del usuario
  guardar() {
    this.Alert = false;
    this.registroExitoso = false;
  
    if (this.forma.valid) {
      const usuario: Usuario = {
        ID_Usuario: 0, 
        Nombre: this.forma.value.Nombre,
        Apellido_Paterno: this.forma.value. Apellido_Paterno,
        Apellido_Materno: this.forma.value. Apellido_Materno,
        Email: this.forma.value.Email,
        Contraseña: this.forma.value.Contraseña,
        Rol: 'Agricultor', 
        Fotoperfil: 'Agricultor', 
        Localidad: this.forma.value.Localidad
       
      };
      console.log(this.forma.value.Email);
      this.usuarioService.guardarUsuario(usuario).subscribe(
        () => {
          this.Alert = true;
          this.registroExitoso = true;
          this.errorMessage = "Registro exitoso";
          setTimeout(() => {
            this.Alert = false;
            this.router.navigate(['/']);
          }, 2000);
        },
        (error) => {
          // Maneja el error en caso de que falle el registro
          console.error(error);
          this.errorMessage = "Ocurrió un error al registrar el usuario";
          this.Alert = true;
        }
      );
    } else {
     
    }
  }

}
