import { Injectable} from '@angular/core';
import { Comments } from '@app/models/Comments';


@Injectable()
export class CommentService {

  constructor() { }

  getComments(): Array<Comments>{
    return  [
        new Comments('4160c25f-8596-4c21-9dc7-3b5d9a323f5a', new Date('2024-10-15'), 'Colombia es muy pecho frio.','4fa006d9-e5cc-47ea-b885-eb3d0085c17a','99614003-9d20-491f-9391-c9a2c0683bad'),
        new Comments('4a5987b8-b2d9-4711-b334-fbc1e7e397ef', new Date('2024-10-15'), 'Interesante','18349965-b565-42c1-a943-e8b6a6b2df21','2914bb72-5cca-478b-b48a-f8762073d77e'),
        new Comments('b2b8ee86-217f-4fea-87b8-07e13b28a903', new Date('2024-10-15'), 'Vamos mexico!!','a1928160-ee2a-4dcd-b75d-e15b9e0122d0','c6675880-d501-4928-9647-35fa75a81c23'),
        new Comments('77f2653b-6c06-4574-bc18-6dc5d23d8461', new Date('2024-10-15'), 'El pueblo unido','375290d0-85ef-42af-b5a3-2a2b1b63bf5a','9792b403-cfd3-4e49-b6b7-1df00d092052'),
        new Comments('0ab9190d-40b3-4d0d-a2ee-31ee39b6c493', new Date('2024-10-15'), 'Jamas será vencido','375290d0-85ef-42af-b5a3-2a2b1b63bf5a','9792b403-cfd3-4e49-b6b7-1df00d092052'),
        new Comments('538587ae-6138-4d74-9680-6bf8d9d8f2ed', new Date('2024-10-15'), 'Se vendieron','9b3588cb-6f6a-4e9e-848c-86e22dd3c205','99614003-9d20-491f-9391-c9a2c0683bad'),
        new Comments('1a5fb3e0-db78-4fa1-a4bc-1edfa69a599b', new Date('2024-10-15'), 'Lucho Diaz no hace nada','2537a549-0968-4d00-9a98-f8f23e60e3c2','99614003-9d20-491f-9391-c9a2c0683bad')
    ]
  }
}
