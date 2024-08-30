import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  TerrenoService } from 'src/app/services/terrenos';
import { ActivatedRoute, Router } from '@angular/router';
import  { Terreno, Usuario} from 'src/app/interfaces/interfaces';
import { CookieService } from 'ngx-cookie-service';
import {UsuarioService} from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-my-lands',
  templateUrl: './my-lands.component.html',
  styleUrls: ['./my-lands.component.css']
})
export class MyLandsComponent {

  forma!: FormGroup;
  mensaje: { texto: string, success: boolean } | null = null;
  terreno: Terreno | null =null;
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
    private route: ActivatedRoute,
    private cookieService: CookieService, 
    private Terreno: TerrenoService,
    private userdata:UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.ID_Usuario = this.obtenerIdUsuarioDesdeCookie();
    
    const idTerreno = this.route.snapshot.paramMap.get('id');
    if (idTerreno) {
      const idNumero = Number(idTerreno); // Convertir a número
      
      // Verificar si la conversión fue exitosa
      if (!isNaN(idNumero)) {
        
        // Hacer una solicitud para obtener los detalles de la plaga
        this.Terreno.getTerrenoById(idNumero).subscribe(
          (data: Terreno) => {
            console.log('Valor del campo Nombre:', data.Nombre);
            // Al recibir los datos, asignarlos al formulario
            this.terreno= data;
            this.crearFormulario(); // Llamar al método para crear el formulario
            this.forma.patchValue(data); // Rellenar el formulario con los datos de la plaga
   
           
          },
          
          (error) => {
            console.error('Error al obtener la plaga:', error);
          }
          
        );
      } else {
        console.error('El ID de la plaga no es un número válido:', idTerreno);
      }
    }
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
      const datosActualizados = {
      
        Nombre: this.forma.value.Nombre,
        Ubicacion: this.forma.value.Ubicacion,
        Ancho: this.forma.value.Ancho,
        Largo: this.forma.value.Largo,
        ID_Usuario: this.ID_Usuario
      };
      console.log('Plagas seleccionadas:', datosActualizados);
      this.Terreno.updateTerreno(this.terreno?.ID_Terreno ?? 0, datosActualizados).subscribe(
        (response) => {
          this.mostrarMensaje('Terreno Actualizado Correctamente', true);
          this.router.navigate(['/navbar/mis-terreno']);
        },
        error => {
          this.mostrarMensaje('Error al guardar el terreno', false);
          console.error('Error al guardar el terreno:', error);
        }
      );
    } else {
      this.mostrarMensaje('El formulario no es válido', false);
      console.error('Debe llenar toos los campos del Terreno');
    }
  }
  
  mostrarMensaje(texto: string, success: boolean) {
    this.mensaje = { texto, success };
  }

  limpiarMensaje() {
    this.mensaje = null;
  }
 
}
