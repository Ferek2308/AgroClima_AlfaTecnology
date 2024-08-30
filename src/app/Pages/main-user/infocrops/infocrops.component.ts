import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CultivoService } from 'src/app/services/cultivos.service';
import { PlagaService } from 'src/app/services/plagas.service';
import { CultivoPlagaService } from 'src/app/services/cultivos_plaga.service';
import { ClimaCultivoService } from 'src/app/services/clima_cultivo.service';
import { Cultivo, Plaga, Cultivo_Plaga, ClimaCultivo, Usuario } from 'src/app/interfaces/interfaces';
import { CookieService } from 'ngx-cookie-service';
import {UsuarioService} from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-infocrops',
  templateUrl: './infocrops.component.html',
  styleUrls: ['./infocrops.component.css']
})
export class InfoCropsComponent implements OnInit {

  base64Imagen: string | null = null;
  mensaje: { texto: string, success: boolean } | null = null;
  plagas: Plaga[] = [];
  plagasRelacionadas: number[] = [];
  plagasSeleccionadas: string[] = [];
  cultivo: Cultivo | null = null;
  clima: ClimaCultivo[] = [];
  ID_Usuario: number = -1;
  Loca: string = "";
  usuario: Usuario  | null = null;
  constructor(
    private route: ActivatedRoute,
    private cultivoService: CultivoService,
    private climaculti: ClimaCultivoService,
    private plagaService: PlagaService,
    private cultivosplagaService: CultivoPlagaService,
    private userdata:UsuarioService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ID_Usuario = this.obtenerIdUsuarioDesdeCookie();
    this.loadUser();

    this.loadPlagas();
    this.obtenerPlagasRelacionadas();
    this.loadCultivo();



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
  obtenerIdUsuarioDesdeCookie(): number {
    const userId = this.cookieService.get('userId');
    return userId ? +userId : -1; // Devuelve -1 si no se encuentra el ID de usuario en la cookie
}

loadUser(): void {
  const iduser = this.ID_Usuario;

  if (iduser) {
    const idNumero = Number(iduser);
    if (!isNaN(idNumero)) {
      this.userdata.getUsuario(idNumero).subscribe(
        (data: Usuario) => {
          this.usuario = data;
          this.Loca = data.Localidad;
          console.log(this.Loca);
          this.loadClimacultivo();
        },
        (error) => {
          console.error('Error al obtener el cultivo:', error);
        }
      );
    } else {
      console.error('El ID del cultivo no es un número válido:', idNumero);
    }
  }
}

  obtenerPlagasRelacionadas(): void {
    const idCultivo = this.route.snapshot.paramMap.get('id');
    if (idCultivo) {
      const idNumero = Number(idCultivo);
      if (!isNaN(idNumero)) {
        this.cultivosplagaService.getCultivoPlagaByCultivoId(idNumero).subscribe(
          (data: Cultivo_Plaga[]) => {
            this.plagasRelacionadas = data.map(item => item.ID_Plaga);
            const nombresPlagas = this.obtenerNombresPlagas();
            this.plagasSeleccionadas = nombresPlagas;
          },
          (error) => {
            console.error('Error al obtener las plagas relacionadas:', error);
          }
        );
      } else {
        console.error('El ID del cultivo no es un número válido:', idCultivo);
      }
    }
  }
  mostrarInformacionPlaga(plagaNombre: string): void {
    // Buscamos la plaga por su nombre en el array de plagas
    const plaga = this.plagas.find(pl => pl.Nombre === plagaNombre);
    if (plaga) {
      // Aquí puedes hacer lo que necesites con los datos de la plaga
      // Por ejemplo, puedes redirigir a una página de detalles de la plaga
      this.router.navigate(['navbar/plaga/', plaga.ID_Plaga]);
    } else {
      console.error('No se encontró la plaga:', plagaNombre);
    }
  }
  loadClimacultivo():void{
    const idCultivo = this.route.snapshot.paramMap.get('id');
    console.log(idCultivo);
    if(this.Loca!== null){
    if (idCultivo ) {
      const idNumero = Number(idCultivo);
      if (!isNaN(idNumero)) {
        this.climaculti.getClimaCultivoByCultivoIdAndLocalidad(idNumero, this.Loca).subscribe(
          (data: ClimaCultivo[]) => {
            this.clima = data;
            console.log(data);
          },
          (error) => {
            console.error('Error al obtener el clima del cultivo:', error);
          }
        );
      } else {
        console.error('El ID del cultivo no es un número válido:', idCultivo);
      }
    }
  }
}

  loadCultivo(): void {
    const idCultivo = this.route.snapshot.paramMap.get('id');
    if (idCultivo) {
      const idNumero = Number(idCultivo);
      if (!isNaN(idNumero)) {
        this.cultivoService.getCultivo(idNumero).subscribe(
          (data: Cultivo) => {
            this.cultivo = data;
            this.base64Imagen = data.Imagen;
          },
          (error) => {
            console.error('Error al obtener el cultivo:', error);
          }
        );
      } else {
        console.error('El ID del cultivo no es un número válido:', idCultivo);
      }
    }
  }

  obtenerNombrePlaga(idPlaga: string): string {
    const idPlagaNumber = parseInt(idPlaga, 10);
    const plaga = this.plagas.find(plaga => plaga.ID_Plaga === idPlagaNumber);
    return plaga ? plaga.Nombre : '';
  }

  obtenerNombresPlagas(): string[] {
    const nombresPlagas: string[] = [];
    this.plagasRelacionadas.forEach(idPlaga => {
      const idPlagaNumber = Number(idPlaga);
      const plaga = this.plagas.find(plaga => plaga.ID_Plaga === idPlagaNumber);
      if (plaga) {
        nombresPlagas.push(plaga.Nombre);
      }
    });
    return nombresPlagas;
  }


  mostrarMensaje(texto: string, success: boolean) {
    this.mensaje = { texto, success };
  }

  limpiarMensaje() {
    this.mensaje = null;
  }

}
