import { Component, OnInit } from '@angular/core';
import { PlagaService } from 'src/app/services/plagas.service';
import { Plaga } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pests',
  templateUrl: './pests.component.html',
  styleUrls: ['./pests.component.css']
})
export class PestsComponent implements OnInit {

  base64Imagen: string | null = null;

  plagas: Plaga| null = null;
  plagasRelacionadas: number[] = [];
  plagasSeleccionadas: string[] = [];
  ID_Usuario: number = -1;
  Loca: string = "";

  constructor(
    private route: ActivatedRoute,
    private plagaService: PlagaService,
    private router: Router
  ) { }

  ngOnInit(): void {


    this.loadPlagas();




  }

  loadPlagas(): void {
    const idplaga = this.route.snapshot.paramMap.get('id');
    if (idplaga) {
      const idNumero = Number(idplaga);
      if (!isNaN(idNumero)) {
        this.plagaService.getPlaga(idNumero).subscribe(
          (data: Plaga) => {
            this.plagas = data;
            this.base64Imagen = data.Imagen;
          },
          (error) => {
            console.error('Error al obtener el cultivo:', error);
          }
        );
      } else {
        console.error('El ID del cultivo no es un número válido:', idplaga);
      }
    }
  }





}
