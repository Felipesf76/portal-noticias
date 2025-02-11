import { Injectable} from '@angular/core';
import { Suscription } from '@app/models/Suscription';


@Injectable()
export class SuscriptionService {

  constructor() { }
  
  getSuscription(): Array<Suscription>{
    return  [
        new Suscription('375290d0-85ef-42af-b5a3-2a2b1b63bf5a', 'a391287c-9b9c-46d8-be15-89eb1757e043'),
        new Suscription('2537a549-0968-4d00-9a98-f8f23e60e3c2', '21724ca9-6ae6-4e74-b6fc-b3397b032cd6'),
        new Suscription('375290d0-85ef-42af-b5a3-2a2b1b63bf5a', '21724ca9-6ae6-4e74-b6fc-b3397b032cd6'),
        new Suscription('a3414a51-84dc-48f1-b967-9ad4106b8cba', '6f4acc96-a1a5-44f4-88cb-3b5f6f916102'),
        new Suscription('375290d0-85ef-42af-b5a3-2a2b1b63bf5a', '5d191a83-99cc-4cb0-8e33-ee825335c789'),
        new Suscription('bb383bbb-7a4a-4ba3-ada2-4d33559cd916', '6f4acc96-a1a5-44f4-88cb-3b5f6f916102'),
        new Suscription('2537a549-0968-4d00-9a98-f8f23e60e3c2', 'a391287c-9b9c-46d8-be15-89eb1757e043')  
    ]
  }
}
