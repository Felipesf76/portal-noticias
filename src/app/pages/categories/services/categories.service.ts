import { Injectable} from '@angular/core';
import { Categories } from '@app/models/Categories';


@Injectable()
export class CategorieService {

  constructor() { }
  
  getCategories(): Array<Categories>{
    return  [
        new Categories('9233552d-5aca-480b-8f04-ecc02c59cbb1','cientificas'),
        new Categories('6f4acc96-a1a5-44f4-88cb-3b5f6f916102','culturales'),
        new Categories('21724ca9-6ae6-4e74-b6fc-b3397b032cd6','deportivas'),
        new Categories('5d191a83-99cc-4cb0-8e33-ee825335c789','económicas'),
        new Categories('ba612ca9-cc0b-49ba-8d8e-b85ad7a310d5','farándula'),
        new Categories('29fb4b28-9e22-480b-8baa-d76062f70506', 'política'),
        new Categories('3228e3fc-5b2e-4f1d-9a8e-ee1dc81c59de', 'sociales'),
        new Categories('a391287c-9b9c-46d8-be15-89eb1757e043', 'sucesos')
    ]
  }
}

