import { Component } from '@angular/core';
import { PublicityCardComponent } from '../../components/publicity-card/publicity-card.component';
import { PublicityService } from '@app/services/publicity.service';
import { Publicity } from '@app/models/Publicity';

@Component({
  selector: 'app-publicity-list',
  imports: [PublicityCardComponent],
  templateUrl: './publicity-list.component.html',
  styleUrl: './publicity-list.component.css',
  providers: [PublicityService]
})
export class PublicityListComponent {
  public record_publicity: Array<any> = []

  constructor(
    private publicityService: PublicityService
  ){
    this.publicityService.getPublicity().subscribe({
      next: (response) => this.record_publicity = response,
      error: (error) => console.error("Error al cargar datos:", error)
    })
  }

  public createPublicity(new_publicity: Array<any>):void{
    console.log("Creando Publicidad2: ", new_publicity)
  }

  public editPublicity(item: Publicity):void{
    console.log("Editando Publicidad: ", item.titulo)
  }

  public deletePublicity(item: Publicity):void{
    this.publicityService.deletePublicity(item.id).subscribe({
      next: (response) => console.log("delete exitoso: ", response),
      error: (error) => console.error("Error al cargar datos:", error)
    })
  }

  // public onFileSelected(image: File):void{
  //   console.log("Cargando imagen:", image)
  // }
}
