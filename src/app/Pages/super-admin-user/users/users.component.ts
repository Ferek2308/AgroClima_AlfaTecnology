import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {
  usuarios: Usuario[] = [];
  seleccionCambio: { [id: number]: boolean } = {};
  selectedRole: string[] = [];
  filtro: string = '';
  filtroMenuVisible: boolean = false;
  selectedFiltro: string = 'Nombre';

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getListaUsuarios().subscribe(
      usuarios => {
        this.usuarios = usuarios;
      },
      error => {
        console.error(error);
      }
    );
  }

  cambiarRol(id: number, nuevoRol: string): void {
    console.log(`Cambiando rol del usuario ${id} a ${nuevoRol}`);
    this.seleccionCambio[id] = true;
  }

  seleccionCambiada(selectedValue: string) {
  
  }
  guardarRol(idUsuario: number, nuevoRol: string): void {
    const usuario = this.usuarios.find(user => user.ID_Usuario === idUsuario);
    if (!usuario) {
        console.error('Usuario no encontrado');
        return;
    }

    // Actualiza el rol del usuario localmente en la interfaz
    usuario.Rol = nuevoRol;

    // Realiza la llamada al servicio para actualizar el rol del usuario en el servidor
    this.usuarioService.actualizarUsuario(idUsuario, usuario).subscribe(
        () => {
            console.log('Rol del usuario guardado con éxito');
            // Aquí podrías realizar alguna acción adicional si es necesario
        },
        error => {
            console.error('Error al guardar el rol del usuario:', error);
            // Si ocurre un error, podrías revertir el cambio localmente o realizar alguna otra acción adecuada
        }
    );
}

  formatRole(role: string): string {
    return role.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
      .replace(/\b\w/g, firstLetter => firstLetter.toUpperCase());
  }
  eliminar(idUsuario: number): void {
    this.usuarioService.eliminarUsuario(idUsuario).subscribe(
      () => {
        // Si la eliminación fue exitosa, actualiza la lista de usuarios en la interfaz
        this.usuarios = this.usuarios.filter(user => user.ID_Usuario !== idUsuario);
      },
      error => {
        console.error('Error al eliminar el usuario:', error);
        // Aquí podrías mostrar un mensaje de error o realizar cualquier otra acción adecuada
      }
    );
  }

  toggleFiltroMenu() {
    this.filtroMenuVisible = !this.filtroMenuVisible;
}

cerrarFiltroMenu() {
  this.filtroMenuVisible = false;
}

filtrarUsuarios(): Usuario[] {
  if (!this.filtro.trim()) {
      return this.usuarios;
  }

  switch (this.selectedFiltro) {
      case 'Nombre':
          return this.usuarios.filter(usuario => usuario.Nombre.toLowerCase().includes(this.filtro.toLowerCase()));
      case 'Localidad':
          return this.usuarios.filter(usuario => usuario.Localidad.toLowerCase().includes(this.filtro.toLowerCase()));
      case 'Rol':
          return this.usuarios.filter(usuario => usuario.Rol.toLowerCase().includes(this.filtro.toLowerCase()));
      default:
          return this.usuarios;
  }
}

}