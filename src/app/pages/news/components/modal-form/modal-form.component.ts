import { Component } from '@angular/core';
import { FormField } from '@shared/components/form/model/form.model';
import { FormComponent } from '@shared/components/form/form.component';

@Component({
  selector: 'app-modal-form',
  imports: [FormComponent],
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.css'
})
export class ModalFormComponent {
  formInputs: FormField[] = [
    {
      label: 'Titulo',
      type: 'text',
      placeholder: 'Titulo de la noticia',
      name: 'titulo'
    },
    {
      label: 'Autor',
      type: 'text',
      placeholder: 'Autor de la noticia',
      name: 'autor'
    }
  ]
}
