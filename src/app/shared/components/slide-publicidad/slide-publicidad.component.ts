import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Publicity } from '@app/models/Publicity';
import { PublicityService } from '@app/services/publicity.service';

@Component({
  selector: 'app-slide-publicidad',
  imports: [CommonModule],
  templateUrl: './slide-publicidad.component.html',
  styleUrl: './slide-publicidad.component.css',
  providers: [PublicityService]
})
export class SlidePublicidadComponent implements OnInit{


  publicity: Publicity | null = null;

  constructor(

    private publicityService: PublicityService
  )
  {
   
  }
  ngOnInit(): void {

    this.publicityService.getPublicityRandom().subscribe({
      next: (data) => {
        this.publicity = new Publicity(
          data.id,
          data.titulo,
          data.url,
          data.multimedia,
          new Date(data.fecha_activacion),
          new Date(data.fecha_fin),
          new Date(data.fecha_publicacion),
          data.id_administrador
        );
      },
      error: (err) => console.error("Error loading publicity:", err)
    })
  }
     

}
