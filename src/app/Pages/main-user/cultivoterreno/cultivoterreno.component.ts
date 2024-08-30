import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  TerrenoService } from 'src/app/services/terrenos';
import {  CultivoService } from 'src/app/services/cultivos.service';
import { TerrenoCultivoService } from 'src/app/services/terreno_cultivo.service';
import  { Terreno, Usuario, Cultivo } from 'src/app/interfaces/interfaces';
import { CookieService } from 'ngx-cookie-service';
import { CultivoSeleccionadoService } from 'src/app/services/selec.service';


@Component({
  selector: 'app-cultivoterreno',
  templateUrl: './cultivoterreno.component.html',
  styleUrls: ['./cultivoterreno.component.css']
})

export class CultivoTerrenoComponent {
  @Output() cerrar: EventEmitter<void> = new EventEmitter<void>();
  forma!: FormGroup;
  showadd: boolean = false;
 terrenos: Terreno[] = []; 
 cultivoSeleccionado: Cultivo | null = null;
 ID_Usuario: number = -1;
 ciclo: number = -1;
 idcul : number=0;
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
    private router: Router,
    private cookieService: CookieService, 
    private Terreno: TerrenoService,
    private cultivo: CultivoService,
    private terrecultivo: TerrenoCultivoService,
    private cultivoSeleccionadoService: CultivoSeleccionadoService

  ) {
    this.showadd = true;
    this.crearFormulario();
    this.ID_Usuario = this.obtenerIdUsuarioDesdeCookie();
    this.loadTerrenos();
    this.cultivoSeleccionadoService.idCultivoSeleccionado$.subscribe(idCultivo => {
      this.agregarCultivoAlTerreno(idCultivo);
      this.idcul = idCultivo;
    this.obtenerCultivo(idCultivo);

      console.log('ID del cultivo seleccionado:', idCultivo);
    });
   
  }
  obtenerIdUsuarioDesdeCookie(): number {
    const userId = this.cookieService.get('userId');
    return userId ? +userId : -1; // Devuelve -1 si no se encuentra el ID de usuario en la cookie
}
obtenerCultivo(idCultivo: number): void {
  this.cultivo.getCultivo(idCultivo).subscribe(
    (cultivo: Cultivo) => {
      this.cultivoSeleccionado = cultivo;
      this.ciclo = cultivo.CicloCultivo;
     this.cultivoSeleccionado.CicloCultivo;
      console.log('Cultivo seleccionado:', this.cultivoSeleccionado);
    },
    error => {
      console.error('Error al obtener el cultivo:', error);
      // Maneja el error aquí
    }
  );
}


  crearFormulario() {
    this.forma = this.fb.group({
      fecha: ["", [Validators.required]], // Cambiado de Validators.email a Validators.required
      terreno: ["", [Validators.required]] 
    });
  }
  agregarCultivoAlTerreno(idCultivo: number): void {
    console.log('Afase 2..');
    if (this.forma.valid && this.cultivoSeleccionado) {
      console.log('Afase 3..');
      const fechaInicio = this.forma.value.fecha;
      const idTerreno: number | undefined = this.forma.get('terreno')?.value as number;

      const cicloCultivo = this.cultivoSeleccionado.CicloCultivo;
      const cicloCultivoMilisegundos = cicloCultivo * 86400000;
      // Sumar el ciclo de cultivo en milisegundos a la fecha de inicio para obtener la fecha de cosecha
      const fechaCosechaMilisegundos = new Date(fechaInicio).getTime() + cicloCultivoMilisegundos;
      console.log(cicloCultivo);
      // Crear un nuevo objeto Date usando la fecha de cosecha en milisegundos
      const fechaCosecha = new Date(fechaCosechaMilisegundos);
      const nuevacultivoTerreno = {
        ID_Terreno: idTerreno,
        ID_Cultivo: idCultivo,
        Fecha_Inicio: new Date(this.forma.value.fecha),
        Fecha_Cosecha: fechaCosecha
      };

      this.terrecultivo.createTerrenoCultivo(nuevacultivoTerreno).subscribe(
        () => {
          console.log('Cultivo agregado al terreno con éxito.');
        },
        error => {
          console.error('Error al agregar el cultivo al terreno:', error);
          // Maneja el error de inserción aquí
        }
      );
    }
  }
  agregar(){
    if (this.forma.valid) {
      // Realiza cualquier acción adicional que desees antes de agregar
      console.log('Agregando elemento...');
      // Llama al método para agregar el cultivo al terreno
      // Puedes pasar cualquier parámetro necesario aquí
      this.agregarCultivoAlTerreno(this.idcul);

      this.cerrar.emit();
    } else {
      // Manejar el caso cuando el formulario no es válido
      console.log('El formulario no es válido. Por favor, completa todos los campos requeridos.');
    }

  };

  loadTerrenos(): void {
    console.log(this.ID_Usuario);
    this.Terreno.getTerrenosByUserId(this.ID_Usuario).subscribe(
      (data: Terreno[]) => {
        this.terrenos = data;
      },
      (error) => {
        console.error('Error al cargar los Terrenos:', error);
      }
    );
  }
  cerrarAgregar() {
    this.showadd = false;
  }

}
