import { Component } from '@angular/core';
import { PlagaService } from 'src/app/services/plagas.service';
import { Plaga,Usuario } from 'src/app/interfaces/interfaces';
import { CookieService } from 'ngx-cookie-service';
import {UsuarioService} from 'src/app/services/usuarios.service';
import { HistorialPlagaService } from 'src/app/services/historial_plaga.service';

@Component({
  selector: 'app-all-pests',
  templateUrl: './all-pests.component.html',
  styleUrls: ['./all-pests.component.css']
})

export class AllPestsComponent {
  plagas: Plaga[] = [];
  plag: Plaga | null = null; 
  name: string = '';
  plaga: string = '';
  ID_Usuario: number = -1;
  filtro: string = '';
  usuario: Usuario| null = null; 
  constructor(
    private plagaService: PlagaService,
    private userdata:UsuarioService,
    private cookieService: CookieService, private historialService: HistorialPlagaService
  ) { }

  ngOnInit(): void {
    this.ID_Usuario = this.obtenerIdUsuarioDesdeCookie();
    this.loadPlagas();
    this.loadUser();
  }
  obtenerIdUsuarioDesdeCookie(): number {
    const userId = this.cookieService.get('userId');
    return userId ? +userId : -1; // Devuelve -1 si no se encuentra el ID de usuario en la cookie
}

loadUser(): void {
 
  this.userdata.getUsuario(this.ID_Usuario).subscribe(
    (datas: Usuario ) => {
      this.usuario = datas;
      this.name = datas.Nombre;
    },
    (error) => {
      console.error('Error al cargar los Terrenos:', error);
    }
  );
}

  loadPlagas(): void {
    this.plagaService.getPlagas().subscribe(
      (data: Plaga[]) => {
        this.plagas = data;
      },
      (error) => {
        console.error('Error al cargar las plagas:', error);
      }
    );
  }
  nameculti(ID_Plaga: number){

    this.plagaService.getPlaga(ID_Plaga).subscribe(
      (data: Plaga) => {
        this.plag = data;
      this.plaga = data.Nombre;
      },
      (error) => {
        console.error('Error al cargar las plagas:', error);
      }
    );
  }
  registrarAccion() {
    const fecha = new Date(); // Esto creará una instancia de Date con la fecha y hora actuales.
  
    const hora = fecha.toLocaleTimeString();
   
  
    const registro = {
      Usuario: this.name,
      Accion: "Eliminacion",
      Plaga_Modificada: this.plaga,
      Cambios_Realizados: "Se elimino la plaga",
      Fecha: fecha,
      Hora: hora
    };
  
    this.historialService.createHistorialPlaga(registro).subscribe(
      () => {
        console.log('Cambio registrado en el historial.');
      },
      error => {
        console.error('Error al registrar el cambio en el historial:', error);
      }
    );
  }
  
  delete(ID_Plaga: number) {
    console.log('ID de la plaga a eliminar:', ID_Plaga); 
    this.nameculti(ID_Plaga);
    this.plagaService.eliminarPlaga(ID_Plaga).subscribe(data => {
      this.loadPlagas();
      this.registrarAccion();
      console.log('Plaga eliminada con éxito');
      
    },
      error => {
        
        console.error('Error al eliminar la plaga:', error);
        
      })
    
  }
    // Método para filtrar las plagas
    filtrarPlagas(): Plaga[] {
      if (!this.filtro.trim()) {
          return this.plagas;
      }
      return this.plagas.filter(plagas =>
          plagas.Nombre.toLowerCase().includes(this.filtro.trim().toLowerCase())
      );
  }
  
}