import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {UsuarioService} from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/interfaces/interfaces';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isNavbarCollapsed = true;
  isDropdownOpen = false;
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
  constructor(private cookieService: CookieService, private userdata:UsuarioService) {   
  }

  ngOnInit(): void {
    const userId = this.obtenerIdUsuarioDesdeCookie();
    if (userId !== -1) {
      this.userdata.getUsuario(userId).subscribe(
        (usuario: Usuario) => {
          this.usuario = usuario;
        },
        error => {
          console.error('Error al obtener detalles del usuario', error);
        }
      );
    }
  }

 obtenerIdUsuarioDesdeCookie(): number {
    const userId = this.cookieService.get('userId');
    return userId ? +userId : -1; // Devuelve -1 si no se encuentra el ID de usuario en la cookie
}
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  toggleDropdown(event: Event) {
    // Detener la propagación del evento para evitar la navegación
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  salir() {
    this.borrarIdUsuarioDeCookie();
  }

  borrarIdUsuarioDeCookie() {
    this.cookieService.delete('userId');
  }
}