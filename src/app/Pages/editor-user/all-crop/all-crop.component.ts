import { Component } from '@angular/core';
import { CultivoService } from 'src/app/services/cultivos.service';
import { Cultivo, Usuario } from 'src/app/interfaces/interfaces';
import { CookieService } from 'ngx-cookie-service';
import {UsuarioService} from 'src/app/services/usuarios.service';
import { HistorialCultivoService } from 'src/app/services/historial_cultivo.service';

@Component({
  selector: 'app-all-crop',
  templateUrl: './all-crop.component.html',
  styleUrls: ['./all-crop.component.css']
})
export class AllCropComponent {
  cultivos: Cultivo[] = [];
  cul: Cultivo | null = null; 
  name: string = '';
  culti: string = '';
  ID_Usuario: number = -1;
  filtro: string = '';
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
  constructor(private cultivoService: CultivoService,    private userdata:UsuarioService,
    private cookieService: CookieService, private historialService: HistorialCultivoService) { }

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
    (datas: Usuario) => {
      this.usuario = datas;
      this.name = datas.Nombre;
    },
    (error) => {
      console.error('Error al cargar los Terrenos:', error);
    }
  );
}

  loadPlagas(): void {
    this.cultivoService.getCultivos().subscribe(
      (data: Cultivo[]) => {
        this.cultivos = data;
      
      },
      (error) => {
        console.error('Error al cargar las plagas:', error);
      }
    );
  }
nameculti(ID_Cultivo:number){

  this.cultivoService.getCultivo(ID_Cultivo).subscribe(
    (data: Cultivo) => {
      this.cul = data;
    this.culti = data.Nombre;
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
    Cultivo_Modificada: this.culti,
    Cambios_Realizados: "Se elimino el cultivo",
    Fecha: fecha,
    Hora: hora
  };

  this.historialService.createHistorialCultivo(registro).subscribe(
    () => {
      console.log('Cambio registrado en el historial.');
    },
    error => {
      console.error('Error al registrar el cambio en el historial:', error);
    }
  );
}

  delete(ID_Cultivo: number) {
    console.log('ID de la plaga a eliminar:', ID_Cultivo); 
    this.nameculti(ID_Cultivo);
    this.registrarAccion();
    this.cultivoService.eliminarCultivo(ID_Cultivo).subscribe(data => {
      this.loadPlagas();
      console.log('Cultivo eliminada con éxito');
   
    },
      error => {
        
        console.error('Error al eliminar la plaga:', error);
        
      })
    
  }
    // Método para filtrar los cultivos
    filtrarCultivos(): Cultivo[] {
      if (!this.filtro.trim()) {
          return this.cultivos;
      }
      return this.cultivos.filter(cultivo =>
          cultivo.Nombre.toLowerCase().includes(this.filtro.trim().toLowerCase())
      );
  }
}