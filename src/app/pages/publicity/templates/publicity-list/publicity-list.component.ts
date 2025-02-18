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
  public record_publicity: Array<any>

  constructor(
    private publicityService: PublicityService
  ){
    this.record_publicity = this.publicityService.getPublicity()
  }

  public createPublicity(new_publicity: Array<any>):void{
    console.log("Creando Publicidad2: ", new_publicity)
  }

  public editPublicity(item: Publicity):void{
    console.log("Editando Publicidad: ", item.titulo)
  }

  public deletePublicity(item: Publicity):void{
    console.log("Eliminando Publicidad: ", item.titulo)
  }

  // public onFileSelected(image: File):void{
  //   console.log("Cargando imagen:", image)
  // }
}
