import { Component, OnInit } from '@angular/core';
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
export class PublicityListComponent  implements OnInit {
  public record_publicity: Array<any> = []

  constructor(
    private publicityService: PublicityService
  ){
    
  }

  ngOnInit() {
    this.getPublicity();
  }

  private getPublicity(): void {
    this.publicityService.getPublicity().subscribe({
      next: (response) => this.record_publicity = response,
      error: (error) => console.error("Error al cargar datos:", error)
    })
  }


  public createPublicity(new_publicity: FormData):void{
    this.publicityService.createPublicity(new_publicity).subscribe({
      next: (response) => {
        console.log("crear exitoso: ", response)
        this.getPublicity();
      },
      error: (error) => console.error("Error al creat publicidad", error)
    })
  }

  public editPublicity(item: FormData):void{
    
    const idPublicity = item.get("id") as string;  

    this.publicityService.editPublicity(item,idPublicity).subscribe({
      next: (response) => {
        console.log("edit exitoso: ", response);
        this.getPublicity();
      },
      error: (error) => console.error("Error al editar datos:", error)
    })
  }

  public deletePublicity(item: Publicity):void{
    this.publicityService.deletePublicity(item.id).subscribe({
      next: (response) => {
        console.log("delete exitoso: ", response)
        this.getPublicity();
      },
      error: (error) => console.error("Error al eliminar datos:", error)
    })
  }
}
