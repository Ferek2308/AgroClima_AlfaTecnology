import { Component } from '@angular/core';
import {  TerrenoService } from 'src/app/services/terrenos';
import { Terreno, Usuario } from 'src/app/interfaces/interfaces';
import { CookieService } from 'ngx-cookie-service';
import {UsuarioService} from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-my_land',
  templateUrl: './my_land.component.html',
  styleUrls: ['./my_land.component.css']
})
export class MyLandComponent {
  terrenos: Terreno[] = [];
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
  constructor(private terrenoService: TerrenoService,private userdata:UsuarioService,private cookieService: CookieService ) { }

  ngOnInit(): void {
    this.ID_Usuario = this.obtenerIdUsuarioDesdeCookie();
    this.loadTerrenos();
   
    console.log(this.ID_Usuario);
  }
  obtenerIdUsuarioDesdeCookie(): number {
    const userId = this.cookieService.get('userId');
    return userId ? +userId : -1; // Devuelve -1 si no se encuentra el ID de usuario en la cookie
}
  loadTerrenos(): void {
    console.log(this.ID_Usuario);
    this.terrenoService.getTerrenosByUserId(this.ID_Usuario).subscribe(
      (data: Terreno[]) => {
        this.terrenos = data;
      },
      (error) => {
        console.error('Error al cargar los Terrenos:', error);
      }
    );
  }

  delete(ID_Terreno: number) {
    console.log('ID del terreno a eliminar:', ID_Terreno); 

    this.terrenoService.deleteTerreno(ID_Terreno).subscribe(data => {
      this.loadTerrenos();
      console.log('Terreno Eliminado');
      
    },
      error => {
        
        console.error('Error al eliminar la plaga:', error);
        
      })
    
  }
   // Método para filtrar los terrenos
   filtrarTerrenos(): Terreno[] {
    if (!this.filtro.trim()) {
        return this.terrenos;
    }
    return this.terrenos.filter(terrenos =>
        terrenos.Nombre.toLowerCase().includes(this.filtro.trim().toLowerCase())
    );
}
  
}