import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  TerrenoService } from 'src/app/services/terrenos';
import {  TerrenoUsuarioService } from 'src/app/services/terreno_usuario.service';
import  { Terreno, Usuario} from 'src/app/interfaces/interfaces';
import { CookieService } from 'ngx-cookie-service';
import {UsuarioService} from 'src/app/services/usuarios.service';



@Component({
  selector: 'app-land',
  templateUrl: './land.component.html',
  styleUrls: ['./land.component.css']
})
export class LandComponent {
  forma!: FormGroup;
  mensaje: { texto: string, success: boolean } | null = null;
  ID_Usuario: number = -1;
  usuario: Usuario = {
    ID_Usuario: -1,
    Nombre: '',
    Apellido_Paterno: '',
    Apellido_Materno: '',
    Email: '',
    Contraseña: '',
    Rol: '',
    Localidad: '',
    Fotoperfil: ''
  };
  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService, 
    private Terreno: TerrenoService,
    private userdata:UsuarioService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.ID_Usuario = this.obtenerIdUsuarioDesdeCookie();
    
  }

  obtenerIdUsuarioDesdeCookie(): number {
    const userId = this.cookieService.get('userId');
    return userId ? +userId : -1; // Devuelve -1 si no se encuentra el ID de usuario en la cookie
}

  crearFormulario() {
    this.forma = this.fb.group({
      Nombre: ['', Validators.required],
      Ubicacion: ['', Validators.required],
      Ancho: ['', Validators.required],
      Largo: ['', Validators.required],
    });
  }

  guardar() {
    
    if (this.forma.valid) {
      const nuevoTerreno = {
      
        Nombre: this.forma.value.Nombre,
        Ubicacion: this.forma.value.Ubicacion,
        Ancho: this.forma.value.Ancho,
        Largo: this.forma.value.Largo,
        ID_Usuario: this.ID_Usuario
      };
      console.log('Plagas seleccionadas:', nuevoTerreno);
      this.Terreno.createTerreno(nuevoTerreno).subscribe(
        () => {
          
          this.mostrarMensaje('Terreno guardado exitosamente', true);
  
        },
        error => {
          this.mostrarMensaje('Error al guardar el terreno', false);
          console.error('Error al guardar el terreno:', error);
        }
      );
    } else {
      this.mostrarMensaje('Debe Llenar todos los Datos del Terreno', false);
      console.error('El formulario no es válido');
    }
  }
  
  mostrarMensaje(texto: string, success: boolean) {
    this.mensaje = { texto, success };
  }

  limpiarMensaje() {
    this.mensaje = null;
  }
 
}
