import { Injectable} from '@angular/core';
import { Publicity } from '@app/models/Publicity';


@Injectable()
export class PublicityService {

  constructor() { }
  
  getPublicity(): Array<Publicity>{
    return  [
        new Publicity('f799300b-0a12-40be-aa97-108e95f8102a', 'Publicidad tenis','https://publicidadtenis.com','assets/images/publicity/publicidad_tenis.png',new Date('2025-05-10'),new Date('2028-08-10'),new Date('2024-11-17'),'375290d0-85ef-42af-b5a3-2a2b1b63bf5a'),
        new Publicity('41eef0a3-6714-49c0-a006-6e0d976109cd', 'Publicidad maletas','https://publicidadmaletas.co','assets/images/publicity/publicidad_maletas.png',new Date('2026-06-29'),new Date('2028-08-11'),new Date('2024-11-17'),'18349965-b565-42c1-a943-e8b6a6b2df21'),
        new Publicity('135840ed-45e5-4131-9d1f-047670bed4d4', 'Publicidad boxeo','https://publicidadboxeo.com','assets/images/publicity/publicidad_boxeo.png',new Date('2024-12-24'),new Date('2025-02-08'),new Date('2024-11-17'),'a1928160-ee2a-4dcd-b75d-e15b9e0122d0'),
        new Publicity('5f6dacd9-5e2c-400d-84d5-595efb61dd18', 'Publicidad cel','https://publicidadcel.com','assets/images/publicity/publicidad_cel.png',new Date('2027-09-10'),new Date('2028-04-07'),new Date('2024-11-17'),'375290d0-85ef-42af-b5a3-2a2b1b63bf5a') 
    ]
  }
}
